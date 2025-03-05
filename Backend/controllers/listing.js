import {Listing} from "../models/listing.js";
import Category from "../models/category.js";

//get listing data 
export const getAllListings = async(req,res)=>{
  
  try{
    const allListings = await Listing.find({});
    return res.status(200).json({
      success:true,
      message:'fetch data Successfully!',
      allListings
    })
  }catch(error){
    // console.log(error.message)
    return res.status(500).json({
      success:false,
      message:'Internal Server Error!'
    })
  }
}


//get listing data  
export const getAllListingForSearching = async(req,res)=>{
  
  try{
    const allListings = await Listing.find({},{productName:true,brand:true,category:true}).populate('category','name');
    return res.status(200).json({
      success:true,
      message:'fetch data Successfully!',
      allListings
    })
  }catch(error){
    // console.log(error.message)
    return res.status(500).json({
      success:false,
      message:'Internal Server Error!'
    })
  }
}

export const getSearchingList = async(req,res)=>{ 
  
  try{
    const {listingId } = req.params;

    const searchListing = await Listing.findById(listingId);

    const brand = searchListing.brand;
    const relatedListings = await Listing.find({brand:brand,_id:{$ne:searchListing._id} }).limit(10);
    const allListings = [searchListing ,...relatedListings]
    
    return res.status(200).json({
      success:true,
      message:'fetch data Successfully!',
      allListings
    })
  }catch(error){
    // console.log(error.message)
    return res.status(500).json({
      success:false,
      message:'Internal Server Error!'
    })
  }
}


//get listing data 
export const getAllListingsforAdmin= async(req,res)=>{
  
  try{
    const allListings = await Listing.find({},{productName:true ,images:true, price:true ,stock:true, seller:true}).populate({path:'seller', select:'firstName lastName email'});
    return res.status(200).json({
      success:true,
      message:'fetch data Successfully!',
      allListings
    })
  }catch(error){
    // console.log(error.message)
    return res.status(500).json({
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
    .populate({path:'reviews', options: { limit: 1 },populate:{path:'customer',select:'firstName lastName image'}})

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


//getFiltered courses handler
export const getFilteredListing = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const currCategory = await Category.findById(categoryId);

    if (!currCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category not found',
      })
    }

    if (currCategory?.listingItems?.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'There are no course available for this category',
        filteredListings :[]
      })
    }
    

    const filteredListings = await Listing.find({ _id: { $in: currCategory.listingItems }}).populate('seller');
    
    return res.status(200).json({
      success: true,
      message: 'Category courses fetched suceesfully!',
      filteredListings
    })


  } catch (error) {
    console.log('Error to fetch filtered lisitngs:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch all courses! Please try again'
    })
  }
}
