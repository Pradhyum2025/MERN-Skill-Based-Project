import {Listing} from "../models/listing.js";
import Category from "../models/category.js";

//get listing data 
export const getAllListings= async(req,res)=>{
  
  try{
    const allListings = await Listing.find({});
    res.status(200).json({
      success:true,
      message:'fetch data Successfully!',
      allListings
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
