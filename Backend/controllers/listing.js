import { Listing } from "../models/listing.js";
import { User } from "../models/user.js";

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
    let {product_id} = req.params;
    let listing =await Listing.findById(product_id);
    res.status(200).json(listing);

  }catch(err){
    res.status(500).json({
      success:false,
      message:'Internal server error! '
    })
  }
}



//post listing data
export const postNewListing = async(req,res)=>{
   
  try{
    let {nameWithModel,price,image,warranty,catagory} = req.body;
    
    let features = ['5000mAh bettery', '50MP camera']
    
    //create  new Listing
    let newListing = new Listing({nameWithModel,price,image,features,warranty,catagory});
    
    // save listing seller in listing
    newListing.seller = req.user.id;
    newListing = await newListing.save();

    //save it again in user listing
    let currUser  = await User.findById(req.user.id);
    currUser.listing.push(newListing);
    await currUser.save();

    
    res.status(201).json({
      success:true,
      message:'Listing has been posted!'
    })

  }catch(error){
    console.log(error.message)

    res.status(500).json({
      success:false,
      message:'Internal Server Error'
    })
  }
}



//edit listing
export const editListing = async(req,res)=>{
  try{

    //get listing detail and compare to request user with listing seller
    let {product_id}=req.params;

    let currListing = await Listing.findById(product_id);

    console.log(currListing);

    if(currListing && currListing.seller._id.toString()===req.user.id){
      
      await Listing.updateOne({_id:product_id},req.body);

      return res.status(200).json({
        success:true,
        message:'Update successfully'
      })
      
    }else{

      return res.status(401).json({
        success:false,
        message:'Unautherized request'
      })
    }

  }catch(error){
    console.log(error.message)
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

// delete product
  export const deleteListing = async(req,res)=>{
    try{
      let {product_id} = req.params;
      //find currUser
      let currListing = await Listing.findById(product_id);
  
      if(currListing && currListing.seller._id.toString()==req.user.id){
        let currUser = await User.findById(req.user.id);
        
        //remove listing from currUser
        currUser.listing=currUser.listing.filter(list=>list._id!=product_id);

        //save  currUser
        await currUser.save();

        //remove listing from DB
        await Listing.findByIdAndDelete(product_id);

        return res.status(200).json({
          success:true,
          message:'Delete Succeesfully!'
        })
        
      }else{
        return res.status(401).json({
          success:false,
          message:'Unautherized request'
        })
      }

    }catch(error){
      console.log(error.message)
      res.status(500).json({
        success:false,
        message:'Internal Server Error!'
      })
    }
  }
