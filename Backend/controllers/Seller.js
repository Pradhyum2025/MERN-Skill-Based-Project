import { Listing } from "../models/listing.js";
import { User } from "../models/user.js";
import Category from "../models/category.js";
import { uploadMultipleImages } from '../utils/imageUploader.js'
import mongoose, { Schema } from "mongoose";

//post listing data
export const postNewListing = async (req, res) => {

  try {
    let { productName,shippingAddress, brand, description, category, price, state, returnPolicy, productWeight, stock, discount } = req.body;

    const userId = req.user.id;

    let features = req.body?.['features[]'];

    let productImages = req?.files?.['images']
     console.log(productImages)
    console.log(req.body)
    if (!productName || !brand || !category || !shippingAddress || !price || !state || !returnPolicy || !description || !productWeight || !stock || !discount || !productImages || !features) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }


    const currCategory = await Category.findById(category);

    if (!currCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category not found!'
      })
    }

    //Upload multiple files
    const uploadImagesSecureUrl = await uploadMultipleImages(productImages, process.env.FOLDER_NAME)

    let productPayload = new Listing({
      productName,
      brand,
      category,
      features,
      price,
      returnPolicy,
      description,
      productWeight,
      stock,
      seller: userId,
      discount,
      images: uploadImagesSecureUrl,
      shippingAddress
    })


    //create  new Listing
    let newListing = await productPayload.save();

    //Save new Listing in category
    currCategory.listingItems.push(newListing._id);

    await currCategory.save();

    // save  seller in listing
    newListing = await newListing.save();

    //save it again in user listing
    let currUser = await User.findByIdAndUpdate({ _id: userId }, {
      $push: {
        listing: {
          $each: [newListing._id],
          $position: 0
        },
      }
    });

    await currUser.save();

    return res.status(200).json({
      success: true,
      message: 'Listing has been posted!'
    })

  } catch (error) {
    console.log("Listing post error : ", error.message)
    return res.status(500).json({
      success: false,
      message: 'Listing has been not posted!'
    })
  }
}


//edit listing
export const updateListing = async (req, res) => {
  try {

    const { listingId } = req.params;
    const userId = req.user.id;

    const currListing = await Listing.findOne({ _id: listingId, seller: userId });

    if (!currListing) {
      return res.status(400).json({
        success: false,
        message: 'Listing not found'
      })
    }

    let { productName, brand, description, category, price, state, returnPolicy, productWeight, stock, discount } = req.body;


    let features = req.body?.['features[]'];

    let productImages = req?.files?.['images']
    

    if (!productName || !brand || !category || !price || !state || !returnPolicy || !description || !productWeight || !stock || !discount  || !features) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    const currCategory = await Category.findById(category);

    if (!currCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category not found!'
      })
    }


    let productPayload = {
      productName,
      brand,
      features,
      price,
      returnPolicy,
      description,
      productWeight,
      stock,
      discount,
    }

    // If category is diff from curr category
    const prevCategory = currListing.category;

    if (!currCategory._id.equals(prevCategory)) {
      //romove product from previous category
      await Category.findByIdAndUpdate({ _id: prevCategory }, {
        $pull: {
          listingItems: currListing._id
        }
      });
      
      // Push in curr category
      await Category.findByIdAndUpdate({ _id: currCategory._id }, {
        $push: {
          listingItems:{
            $each:[currListing._id]
          } 
        }
      })
      //
      productPayload.category = currCategory._id;
    }

    if (productImages) {
      //Upload multiple files
      const uploadImagesSecureUrl = await uploadMultipleImages(productImages, process.env.FOLDER_NAME)
      // save image urls in Schema
      productPayload.images = uploadImagesSecureUrl;
    }
    
    let response = await Listing.findByIdAndUpdate(listingId ,productPayload,{new:true});

    return res.status(200).json({
      success: true,
      message: 'Update successfully'
    })


  } catch (error) {
    console.log("ERROR :", error?.message)
    res.status(500).json({
      success: false,
      message: error?.message
    })
  }
}

// delete product
export const deleteListing = async (req, res) => {

  try {
    let { listingId } = req.params;
    const userId = req.user.id;

    const currUser = await User.findOne({
      _id: userId,
      listing: {
        $elemMatch: {
          $eq: new mongoose.Types.ObjectId(listingId)
        }
      }
    })

    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'maybe user or listing details not found'
      })
    }

    let listings = await Listing.findByIdAndDelete(listingId);

    return res.status(200).json({
      success: true,
      message: 'Deleted Succeesfully!',
    })

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error!'
    })
  }
}

//Get my listings
export const getMyListing = async (req, res) => {
  try {

    const userId = req.user.id;

    const currUser = await User.findById(userId);

    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }

    const myListings = currUser.listing;

    const listings = await Listing.find({
      _id: {
        $in: myListings
      }
    })

    return res.status(200).json({
      success: true,
      message: 'Listing fetch suceess',
      listings
    })

  } catch (error) {
    console.log('Get My Lisitng error : ', error?.message)
    return res.status(500).json({
      success: false,
      message: 'Internal sever error'
    })
  }
}

//Get my listings
export const getAllSellers = async (req, res) => {
  try {

    const userId = req.user.id;

    const currUser = await User.findOne({_id:userId,accountType:'Admin'});

    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }

    const allSellers = await User.find({accountType:'Seller'},{
      firstName:true,
      lastName:true,
      contact:true,
      email:true
    }).populate('sellerDetails');

    return res.status(200).json({
      success: true,
      message: 'Seller fetch suceess',
      allSellers
    })

  } catch (error) {
    console.log('Get all seller error : ', error?.message)
    return res.status(500).json({
      success: false,
      message: 'Internal sever error'
    })
  }
}