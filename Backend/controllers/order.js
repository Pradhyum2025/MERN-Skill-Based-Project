import { Order } from "../models/order.js";
import { Listing } from '../models/listing.js'
import { SubOrder } from "../models/subOrder.js";
import { User } from "../models/user.js";

export const createOrder = async (req, res) => {
  try {

    const { orderList, deliveryAddress } = req.body;
    const userId = req.user.id;

    // Check for validation
    if (orderList && orderList.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please choose product'
      })
    }

    //Calculate total 
    const totalAmount = orderList.reduce((sum, listing) => sum + (listing.price * listing.quantity), 0);


    // Order payLoad
    let orderPayload = {
      buyer: userId,
      deliveryAddress,
      products: orderList,
      totalAmount,
      paymentStatus: {
        method: 'COD',
        status: 'Pending',
        transactionId: null
      }

    }

    // --------- Create order --------- 
    let order = await Order.create(orderPayload);

    const listingObj = await Listing.find({ _id: { $in: orderList.map(listing => listing.product) } }, { seller: true, price: true });
   
   // --------- Create subOrder --------- 
    for (let i = 0; i < listingObj.length; i++) {

      const listingId = listingObj[i]?._id;
      const sellerId = listingObj[i]?.seller;
      const quantity = orderList[i]?.quantity;
       
      // if subOrder aleady exist for currSeller
      const subOrder = await SubOrder.findOne({ order: order._id, seller: sellerId })

      if (subOrder) {
        await SubOrder.findOneAndUpdate({ order: order._id, seller: sellerId }, {
          $push: {
            products: [{
              productId: listingId,
              quantity: orderList[i].quantity
            }]
          }
        })

      } else {
        // otherwise Create new subOrder
        const seller = await User.findById(sellerId, { sellerDetails: true });

        const subOrderPayload = {
          order: order._id,
          seller: sellerId,
          products: [{
            productId: listingId,
            quantity: orderList[i].quantity
          }],
          SellerDetails: seller.sellerDetails
        }

        const newSubOrder = await SubOrder.create(subOrderPayload);

        console.log('newSubOrder ------->>>', newSubOrder)

        await Order.findByIdAndUpdate(order._id, {
          $push: {
            subOrders: newSubOrder._id
          }
        })
      }
      
      //Decrement currListing stock by quantity
      await Listing.findByIdAndUpdate(listingId,
        {$inc:{stock:- quantity}},{new:true});

    }
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
