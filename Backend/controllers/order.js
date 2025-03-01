import { Order } from "../models/order.js";
import { Listing } from '../models/listing.js'
import { SubOrder } from "../models/subOrder.js";
import { User } from "../models/user.js";
import { Bag } from "../models/bag.js";
import { Address } from "../models/address.js";
import { mailSender } from "../utils/mailSender.js";
import OrderConfirmation from "../emailTemplate/OrderConfirmation.js";
import OrderCancellationEmail from "../emailTemplate/orderCancle.js";
import { OTP } from "../models/otp.js";
import otpGenerator from 'otp-generator'
import dotenv from 'dotenv'
import mongoose from "mongoose";
dotenv.config();

export const createOrder = async (req, res) => {
  try {

    const userId = req.user.id;

    const customer = await User.findById(userId, { bag: true, addresses: true, email: true });

    const bagItems = await Bag.find({ _id: { $in: customer.bag }, quantity: { $gt: 0 } }).populate('product', "productName stock price discount seller");

    let orderList = bagItems.filter(orderItem => orderItem.product.stock !== 0 && orderItem.product.stock >= orderItem.quantity);


    // Check for validation
    if (orderList && orderList.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please choose stock items'
      })
    }

    //Calculate total 
    let totalAmount = orderList.reduce((sum, orderItem) => sum + (((orderItem.product.price) - ((orderItem.product.discount * orderItem.product.price) / 100)) * orderItem.quantity), 0);

    totalAmount = Math.floor(totalAmount);

    //Find user address 
    const deliveryAddress = await Address.findOne({ _id: { $in: customer.addresses }, isDefault: true })

    //filter orderList 
    const orders = orderList.map(order => {
      let mapedOrder = {
        product: order.product._id,
        quantity: order.quantity,
        price: order.product.price
      }
      return mapedOrder;
    }
    )

    // Order payLoad
    let orderPayload = {
      buyer: customer._id,
      deliveryAddress: deliveryAddress._id,
      products: orders,
      totalAmount,
      paymentStatus: {
        method: 'COD',
        status: 'Pending',
        transactionId: null
      },
      orderStatus: 'Processing'
    }

    // --------- Create order --------- 
    let newOrder = await Order.create(orderPayload);


    // --------- Create subOrder --------- 
    for (let i = 0; i < orderList.length; i++) {

      const listingId = orderList[i]?.product._id;
      const sellerId = orderList[i]?.product.seller;
      const quantity = orderList[i]?.quantity;

      // if subOrder aleady exist for currSeller
      const subOrder = await SubOrder.findOne({ order: newOrder._id, seller: sellerId })

      if (subOrder) {
        await SubOrder.findOneAndUpdate({ order: newOrder._id, seller: sellerId }, {
          $push: {
            products: [{
              productId: listingId,
              quantity: quantity
            }]
          }
        })

      } else {
        // otherwise Create new subOrder
        const seller = await User.findById(sellerId, { sellerDetails: true });

        const subOrderPayload = {
          order: newOrder._id,
          seller: sellerId,
          products: [{
            productId: listingId,
            quantity: quantity
          }],
          SellerDetails: seller.sellerDetails
        }

        const newSubOrder = await SubOrder.create(subOrderPayload);

        // Push mew subOrder into order;
        newOrder = await Order.findByIdAndUpdate(newOrder._id, {
          $push: {
            subOrders: {
              $each: [newSubOrder._id],
              $position: 0
            }
          }
        }, { new: true })

        //Push new SubOrder in seller account
        await User.findByIdAndUpdate(sellerId, {
          $push: {
            myOrders: {
              $each: [newSubOrder._id],
              $position: 0
            }
          }
        })
      }

      //Decrement currListing stock by quantity
      await Listing.findByIdAndUpdate(listingId,
        { $inc: { stock: - quantity } }, { new: true });


    }

    //Push order in customer account 
    let user = await User.findByIdAndUpdate(customer._id, {
      $push: {
        myOrders: {
          $each: [newOrder._id],
          $position: 0
        }
      }
    }, { new: true })

    //Send Mail to buyer for their order
    await mailSender(customer.email, 'Thank you for Order - E-commerce', OrderConfirmation(newOrder._id, "Cash on Delivery"))

    //Retern response
    return res.status(200).json({
      success: true,
      message: 'Order created successfully',
    })

  } catch (err) {
    console.log("Order creation error : ", err.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })
  }

}

export const getMyOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.body;

    const currUser = await User.findById(userId, { myOrders: true })
    if (!status || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Something missing, please try again!'
      })
    }
    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }

    let currOrders = []
    if (req.user.role === 'Buyer') {
      if (status === "*") {
        currOrders = await Order.find({ _id: { $in: currUser.myOrders } }, { createdAt: true, orderStatus: true, totalAmount: true, paymentStatus: true }).sort({createdAt:-1})
      } else {
        currOrders = await Order.find({ _id: { $in: currUser.myOrders }, orderStatus: status }, { createdAt: true, orderStatus: true, totalAmount: true, paymentStatus: true }).sort({createdAt:-1})
      }
    } else {
      if (status === "*") {
        currOrders = await SubOrder.find({ _id: { $in: currUser.myOrders } }, { order: true, createdAt: true, status: true, products: true }).sort({createdAt:-1})
      } else {
        currOrders = await SubOrder.find({ _id: { $in: currUser.myOrders }, status: status }, { order: true, createdAt: true, status: true, products: true }).sort({createdAt:-1})
      }
    }

    // Check for validation
    return res.status(200).json({
      success: true,
      message: 'Order get successfully',
      currOrders
    })


  } catch (err) {
    console.log("GET ORDER ERROR : ", err.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })
  }
}

export const getOrderDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;
   
    if(!orderId || !userId){
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }
    const currUser = await User.findById(userId)

    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }

    let orderDetails = null;
    if (req.user.role === 'Buyer') {
      orderDetails = await Order.findOne({ _id:orderId, buyer: userId }, { subOrders: false })
        .populate('deliveryAddress')
        .populate({ path: 'products', populate: { path: 'product', select: 'price images productName discount returnPolicy' } })

    } else if (req.user.role === 'Seller') {
      orderDetails = await SubOrder.findOne({ _id: orderId , seller: userId })
        .populate({ path: 'products', populate: { path: 'productId', select: "price images productName discount", populate: { path: 'shippingAddress' } } })
        .populate('SellerDetails')
        .populate({ path: 'seller', select: 'firstName lastName email contact' })
    } else {
      orderDetails = await SubOrder.findOne({ _id: orderId })
        .populate({ path: 'products', populate: { path: 'productId', select: "price images productName discount", populate: { path: 'shippingAddress' } } })
        .populate({ path: 'seller', select: 'firstName lastName email contact'})
        .populate('SellerDetails','companyName contact')
    }
   
    // Check for validation
    return res.status(200).json({
      success: true,
      message: 'Order details fetched success',
      orderDetails
    })


  } catch (err) {
    console.log("GET MY ORDER ERROR : ", err?.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })
  }
}

export const getAllOrdersForAdmin = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Something missing, please try again!'
      })
    }
    const currUser = await User.findOne({ _id: userId, accountType: 'Admin' })
    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }

    let currOrders = []
    if (status === "*") {
      currOrders = await Order.find({}, { createdAt: true, orderStatus: true, totalAmount: true, paymentStatus: true }).sort({createdAt:-1});
    } else {
      currOrders = await Order.find({ orderStatus: status }, { createdAt: true, orderStatus: true, totalAmount: true, paymentStatus: true }).sort({createdAt:-1})
    }

    return res.status(200).json({
      success: true,
      message: 'Order get successfully',
      currOrders
    })


  } catch (err) {
    console.log("GET ORDER FOR ADMIN ERROR : ", err.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })
  }
}

export const getOrderDetailsforAdmin = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;
    const currUser = await User.findOne({ _id: userId, accountType: 'Admin' })

    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }

    let orderDetails = await Order.findById(orderId, { products: false })
      .populate('deliveryAddress')
      .populate('buyer', 'firstName lastName email contact')
      .populate('subOrders','createdAt status')

      
    // Check for validation
    return res.status(200).json({
      success: true,
      message: 'Order details fetched success',
      orderDetails
    })


  } catch (err) {
    console.log("GET ORDER ERROR : ", err?.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })
  }
}

export const cancleOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const currUser = await User.findOne({
      _id: userId,
      $or: [{ accountType: 'Admin' }, { accountType: 'Buyer' }]
    },{accountType:true})

    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }
    let orderDetails = await Order.findById(orderId, {buyer:true, orderStatus: true, products: true, subOrders: true })
    
    if(currUser.accountType!=='Admin' && !orderDetails.buyer.equals(currUser._id)){
      return res.status(400).json({
        success: false,
        message: 'Unautherized access'
      })
    }

    if (orderDetails.orderStatus === 'Cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Your order aleady cancelled'
      })
    }

    if (orderDetails.orderStatus === 'Processing') {
      //Increase stock of each item by quantity
      for (let productItem of orderDetails.products) {
        const listingId = productItem.product;
        const quantity = productItem.quantity;

        await Listing.findByIdAndUpdate(listingId, {
          $inc: { stock: quantity }
        })
      }

      //change sub orders status
      await SubOrder.updateMany({ _id: { $in: orderDetails.subOrders } }, { status: 'Cancelled' })

      //finaly cancle the order to chnage status
      orderDetails = await Order.findByIdAndUpdate(orderId, { orderStatus: 'Cancelled' }, { buyer: true, paymentStatus: true }).populate('buyer', 'firstName lastName email')


      const fullName = `${orderDetails.buyer.firstName} ${orderDetails.buyer.lastName}`

      await mailSender(orderDetails.buyer.email, 'Order Cancle Confirmation - E-commerce', OrderCancellationEmail(orderDetails._id, fullName, currUser.accountType, orderDetails.paymentStatus.method))

      // Return response
      return res.status(200).json({
        success: true,
        message: `Your Order has Been Cancelled`,
      })

    } else {
      return res.status(400).json({
        success: false,
        message: 'Order can be cancle during processing phase'
      })
    }

  } catch (err) {
    console.log("GET ORDER ERROR : ", err?.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })
  }
}

export const setDeliveredOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;
    const {otp} =req.body;
    const actulOtp = parseInt(otp, 10);

    if (!orderId || !userId || !otp) {
      return res.status(400).json({
        success: false,
        message: 'All feilds are required'
      })
    }
    const currUser = await User.findOne({
      _id: userId,
      accountType: 'Admin'
    })

    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }

    
    let orderDetails = await Order.findById(orderId, {buyer:true, orderStatus: true, products: true, subOrders: true }).populate('buyer','email')

    
    const email = orderDetails.buyer.email;
    const storedOtp = await OTP.findOne({orderId:orderId ,email:email}).sort({createdAt:-1}).limit(1);

    if(!storedOtp){
      return res.status(400).json({
        success: false,
        message: 'OTP expired, Please try again!'
      })
    }
 
    if (actulOtp !== storedOtp.otp) {
      return res.status(400).json({
        success: false,
        message: 'Inavalid OTP'
      })
    }

    if (orderDetails.orderStatus === 'Processing') {
      //change sub orders status
      await SubOrder.updateMany({ _id: { $in: orderDetails.subOrders } }, { status: 'Delivered' })

      //finaly cancle the order to chnage status
      orderDetails = await Order.findByIdAndUpdate(
        orderId,
        {
          orderStatus: 'Delivered',
          paymentStatus: {
            status: 'Completed',
            method: 'COD',
            transactionId: null
          }
        },{new:true})
  
      // Return response
      return res.status(200).json({
        success: true,
        message: `Order has been delivered`,
      })

    } else {
      return res.status(400).json({
        success: false,
        message: 'Order can be cancle before during processing phase'
      })
    }

  } catch (err) {
    console.log("SET ORDER  DELIVERERD ERROR : ", err?.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })
  }
}

// ----- Send otp for order delever ------
export const sendOTP = async (req, res) => {
 
  try {
    const {orderId} = req.params;
    const userId= req.user.id;
   
    if(!orderId || !userId){
      return res.status(400).json({
        success: false,
        message: 'all fiiled are required! '
      })
    }
  
    //Check if user already exist
    const currOrder = await Order.findOne({ _id: orderId , 
      $or:[{orderStatus :'Processing'},{orderStatus :'Cancelled'}]
    },{buyer:true}).populate('buyer','email')
   console.log(currOrder)
    if (!currOrder) {
      return res.status(409).json({
        success: false,
        message: 'Order not found'
      })
    }

    const email = currOrder?.buyer?.email;

    //Generate OTP   
    const otp = otpGenerator.generate(process.env.OTP_LENGTH, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

    //Entery of otp in database
    let otpPayload = { email, otp ,orderId };
     let newOtp = await OTP.create(otpPayload);

    return res.status(200).json({
      success: true,
      message: 'Otp generated successfully!',
    })

  } catch (error) {
    console.log('error in OTP generation!', error);
    return res.status(500).json({
      success: false,
      message: 'Otp generate failed!'
    })
  }

}


