import { Review } from "../models/review.js";
import { User } from "../models/user.js";
import { Listing } from "../models/listing.js";

//post review
export const postReview = async(req,res)=>{
  try{
   
    let {listing_id}= req.params;

    let currListing = await Listing.findById(listing_id);
   
    // create and save review
    let newReview = new Review({...req.body,author:req.user.id});
    newReview = await newReview.save();

    //push review on currlisting and save it
    currListing.reviews.push(newReview._id);
    currListing = await currListing.save();
    return res.status(200).json({
      success:true,
      message:'Review posted suceesfully'
    })

  }catch(err){
    console.log("ERROR:",err.message)
    return res.status(500).json({
      success:false,
      message:'Internal server error!'
    })

  }
}

//delete review
export const deleteReview = async(req,res)=>{
  try{
    let {Listing_id,review_id}= req.params;
    let currReview = await Review.findById(review_id);

    if(currReview && currReview.author.equals(req.user.id)){
      //  console.log(currReview)
        await Listing.findByIdAndUpdate(Listing_id,{$pull:{reviews:review_id}});
        await Review.findByIdAndDelete(review_id);
        // console.log(req.params)
        return res.status(200).json({
          success:true,
          message:'Review deleted suceesfully'
        })
    }
  }catch(err){
    console.log(err.message)
    return res.status(500).json({
      success:false,
      message:'Internal server error!'
    })

  }
}