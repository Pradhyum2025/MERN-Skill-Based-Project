import { User } from "../models/user.js";
import instance from '../config/razorpay.js'
import { mailSender } from "../utils/mailSender.js";
import crypto from 'crypto'
import { Address } from "../models/address.js";
import { Bag } from "../models/bag.js";
import { Order } from "../models/order.js";
import { Listing } from '../models/listing.js'
import { SubOrder } from "../models/subOrder.js";
import OrderConfirmation from "../emailTemplate/OrderConfirmation.js";



// -----------create payament OR capture payment handler -----------
export const capturePayment = async (req, res) => {
  try {

    const userId = req.user.id;

    // -------- 1.validate user id
    let user = await User.findById(userId, { bag: true, addresses: true });

    if (!user || user.bag.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Did not found any choosen items'
      })
    }

    //------------2. validate-------------
    const bagItems = await Bag.find({ _id: { $in: user.bag }, quantity: { $gt: 0 } }).populate('product', "stock price discount");

    let orderList = bagItems.filter(orderItem => orderItem.product.stock !== 0 && orderItem.product.stock >= orderItem.quantity);


    // Check for validation
    if (orderList && orderList.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please choose items which present in stock'
      })
    }

    //Calculate total 
    const totalAmount = orderList.reduce((sum, orderItem) => sum + (((orderItem.product.price) - ((orderItem.product.discount * orderItem.product.price) / 100)) * orderItem.quantity), 0);


    const choosedAddress = await Address.findOne({ _id: { $in: user.addresses }, isDefault: true })
    //Modify user info

    const orderInfo = {
      fullName: `${choosedAddress.firstName} ${choosedAddress.lastName}`,
      user: user.email,
      contact: choosedAddress.contact?.[0],
      totalAmount,
      userId,
      orderList: orderList.map(order => order._id)
    }

    // ---------- Order creation ----------
    const amount = totalAmount;
    const currency = 'INR'

    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        orderInfo
      }
    }

    try {

      //initialize the payment using razorpay
      const paymentResponse = await instance.orders.create(options);

      // --------- return response ------------
      return res.status(200).json({
        success: true,
        user,
        key: process.env.RAZORPAY_KEY,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount

      })
    } catch (error) {
      console.log('Payement capture error to create instance: ', error.message)
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }


  } catch (error) {
    console.log('Payement capture error : ', error)
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }

}

// verify the payment
export const varifySignature = async (req, res) => {

  try {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const userId = req.user.id


    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId) {
      return res.status(400).json({
        success: false,
        message: "Payment Failed"
      })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature === razorpay_signature) {
      await createOrder(userId, razorpay_payment_id, res);

      return res.status(200).json({
        success: true,
        message: "Payment Verification successful"
      })

    } else {
      return res.status(400).json({
        success: false,
        message: "Payment varification failed"
      })
    }

  } catch (error) {
    console.log('Signature verification error ', error.message)
    return res.status(500).json({
      success: false,
      message: "Payment Failed"
    })
  }
}

const createOrder = async (userId, razorpay_payment_id, res) => {

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
      method: 'UPI',
      status: 'Completed',
      transactionId: razorpay_payment_id
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
          subOrders: [newSubOrder._id]
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
  let user = await User.findByIdAndUpdate(customer, {
    $push: {
      myOrders: {
        $each: [newOrder._id],
        $position: 0
      }
    }
  }, { new: true })

  //Send Mail to buyer for their order
  await mailSender(customer.email, 'Thank you for Order - E-commerce', OrderConfirmation(newOrder._id, "UPI", razorpay_payment_id))

}


export const capturePaymentAtDelivery = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    if (!userId || !orderId) {
      return res.status(401).json({
        success: false,
        message: 'All fields are rquired'
      })
    }
    const currUser = await User.findOne({ _id: userId, accountType: 'Admin' });

    if (!currUser) {
      return res.status(401).json({
        success: false,
        message: 'Admin not found'
      })
    }

    const currOrder = await Order.findById(orderId, { totalAmount: true, buyer: true,orderStatus:true,paymentStatus:true }).populate('buyer', 'firstName lastName email contact');

    if(currOrder.orderStatus!=='Processing'){
      return res.status(401).json({
        success: false,
        message: 'Can Not Accept Payment With Current Order Status'
      })
    }

    if(currOrder.paymentStatus.status==='Completed'){
      return res.status(401).json({
        success: false,
        message: 'Payment alredy done'
      })
    }


    const customer = {
      fullName: `${currOrder.buyer.firstName} ${currOrder.buyer.lastName}`,
      email: currOrder.buyer.email,
      contact: currOrder.buyer?.contact?.lenght > 0 ? currOrder.buyer?.contact?.[0] : ''
    }
    const amount = currOrder.totalAmount;
    const currency = 'INR'

    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        order: currOrder._id,
        totalAmount: currOrder.totalAmount
      }
    }

    try {

      //initialize the payment using razorpay
      const paymentResponse = await instance.orders.create(options);

      // --------- return response ------------
      return res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_KEY,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
        customer
      })

    } catch (error) {
      console.log('Payement capture error to create instance: ', error.message)
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }

  } catch (error) {
    console.log('Payement capture error at delivery: ', error)
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const verifyPaymentAtDelivery = async (req, res) => {
  try {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const { orderId } = req.params;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return res.status(400).json({
        success: false,
        message: "Payment Failed"
      })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature === razorpay_signature) {

      let orderDetails = await Order.findById(orderId, { buyer: true, orderStatus: true, products: true, subOrders: true }).populate('buyer', 'email')


      const email = orderDetails.buyer.email;
      
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
              method: 'UPI',
              transactionId: razorpay_payment_id
            }
          }, { new : true })
        
        
        await mailSender(email, 'Payment Confirmation Mail - E-commerce', OrderConfirmation(orderId, "UPI", razorpay_payment_id));

        // Return response
        return res.status(200).json({
          success: true,
          message: `Payment successful!`,
          razorpay_payment_id
        })

      } else {
        return res.status(400).json({
          success: false,
          message: 'Order status is not in processing'
        })
      }

    } else {
      return res.status(400).json({
        success: false,
        message: "Payment varification failed"
      })
    }

  } catch (error) {
    console.log('Signature verification error ', error.message)
    return res.status(500).json({
      success: false,
      message: "Payment Failed"
    })
  }
}
