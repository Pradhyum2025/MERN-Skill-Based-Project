import {Listing} from "../models/listing.js";


//get listing data 
export const getAllListings= async(req,res)=>{
  
  try{
    const allListings = await Listing.find({});
    res.status(200).json({
      success:true,
      message:'fetch data Successfully!',
      data:allListings
    })
  }catch(error){
    // console.log(error.message)
    res.status(500).json({
      success:false,
      message:'Internal Server Error!'
    })
  }
}


//show product
export const showListing = async(req,res)=>{
  try{
  
    let {listingId} = req.params;
    
    let listingData = await Listing.findById(listingId)
    // .populate('seller')
    // .exce();

    return res.status(200).json({
      success:true,
      message:'fetch data Successfully!',
      listingData
    });

  }catch(error){
    console.log('Get single listing for show error : ',error?.message)
    return res.status(500).json({
      success:false,
      message:'Internal server error! '
    })
  }
}

