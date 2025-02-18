import { Order } from "../models/order.js";
import { Listing } from '../models/listing.js'
import { SubOrder } from "../models/subOrder.js";
import { User } from "../models/user.js";
import { Bag } from "../models/bag.js";
import { Address } from "../models/address.js";

export const createOrder = async (req, res) => {
  try {

    const userId = req.user.id;

    const customer = await User.findById(userId, { bag: true, addresses: true });

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
    const totalAmount = orderList.reduce((sum, orderItem) => sum + (((orderItem.product.price) - ((orderItem.product.discount * orderItem.product.price) / 100)) * orderItem.quantity), 0);


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
            subOrders:{
              $each: [newSubOrder._id],
              $position:0
            }
          }
        }, { new: true })

        //Push new SubOrder in seller account
        await User.findByIdAndUpdate(sellerId, {
          $push: {
            myOrders: {
              $each:[newSubOrder._id],
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
        myOrders:{
        $each : [newOrder._id],
        $position: 0
      }
    }}, { new: true })


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

    const currUser = await User.findById(userId, { myOrders: true })

    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }

    let  currOrders = []
    if(req.user.role==='Buyer'){
       currOrders = await Order.find({ _id: { $in: currUser.myOrders } }, { createdAt: true, orderStatus: true, totalAmount: true,paymentStatus:true })

    }else{
      currOrders = await SubOrder.find({ _id: { $in: currUser.myOrders } }, {order:true, createdAt: true, status: true})
    }

    // Check for validation

    return res.status(200).json({
      success: true,
      message: 'Please choose stock items',
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
    const {orderId} = req.params;

    const currUser = await User.findById(userId, { myOrders: true })

    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }

    let  orderDetails = null;
    if(req.user.role==='Buyer'){
      orderDetails = await Order.findOne({ _id: orderId ,buyer:userId},{subOrders:false})
      .populate('deliveryAddress')
      .populate({path:'products',populate:{path:'product',select:'price images productName discount'}})

    }else{
      orderDetails = await SubOrder.find({ _id: orderId ,seller:userId})
    }

    // Check for validation
    return res.status(200).json({
      success: true,
      message: 'Please choose stock items',
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


