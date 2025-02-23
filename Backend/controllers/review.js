import { Review } from "../models/review.js";
import { User } from "../models/user.js";
import { Listing } from "../models/listing.js";
import mongoose, { Mongoose } from "mongoose";
import { Order } from "../models/order.js";

//post review
export const postReview = async (req, res) => {
  try {

    const { orderId, listingId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    if (!orderId || !listingId || !userId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'All fiels are required',
      })
    }

    let currUser = await User.findOne({
      _id: userId,
      myOrders: {
        $elemMatch: {
          $eq: new mongoose.Types.ObjectId(orderId)
        }
      }
    }, { myOrders: true });

    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      })
    }

    const currOrder = await Order.findById(orderId, { products: true });

    let isListingPresent = false;

    let currListings = currOrder.products.map(itemObj => {
      if (itemObj.product.equals(listingId)) {
        isListingPresent = true;
      }
    })

    if (isListingPresent) {
      const newReview = await Review.create({ rating, comment, customer: userId });
      currListings = await Listing.findByIdAndUpdate(listingId, {
        $push: {
          reviews: {
            $each: [newReview._id], $position: 0
          }
        }
      }, { new: true })
      console.log(newReview);
      return res.status(200).json({
        success: true,
        message: 'Review posted suceesfully'
      })

    } else {
      return res.status(400).json({
        success: false,
        message: 'Order issue occured'
      })
    }

  } catch (err) {
    console.log("ERROR TO POST REVIEW:", err.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })

  }
}

//post review
export const getReviews = async (req, res) => {
  try {

    const { listingId } = req.params;

    if (!listingId) {
      return res.status(400).json({
        success: false,
        message: 'All fiels are required',
      })
    }
    const currListing = await Listing.findById(listingId,{reviews:true});

    if(!currListing){
      return res.status(400).json({
        success: false,
        message: 'Product details not found',
      })
    }
    const currReviews = await Review.find({_id:{$in:currListing.reviews}}).populate('customer','firstName lastName');
    

    return res.status(200).json({
      success: true,
      message: 'Get all reviews success',
      allReviews:currReviews
    })


  } catch (err) {
    console.log("ERROR TO GET REVIEW:", err.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })

  }
}

// delete review
export const deleteReview = async (req, res) => {
  try {
    let { listingId, reviewId } = req.params;
    const userId = req.user.id;

    if (!reviewId || !listingId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'All fiels are required',
      })
    }
    let currReview = await Review.findOne({ _id: reviewId, customer: userId });

    if (currReview) {
      await Listing.findByIdAndUpdate(listingId, {
        $pull: {
          reviews: reviewId
        }
      });

      await Review.findByIdAndDelete(reviewId);

      return res.status(200).json({
        success: true,
        message: 'Review delete suceesfully'
      })
    }

  } catch (err) {
    console.log("REVIEW DELETION ERROR :", err.message)
    return res.status(500).json({
      success: false,
      message: 'Internal server error!'
    })

  }
}