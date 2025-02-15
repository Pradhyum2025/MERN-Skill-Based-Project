import mongoose from "mongoose";
import { User } from "../models/user.js";
import { Listing } from '../models/listing.js'
import { Bag } from "../models/bag.js";

// ----------------- get My bag items cart handler ----------------
export const getMyBag = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User not found!'
      })
    }

    let currUser = await User.findOne({ _id: userId, accountType: 'Buyer' }, { bag: true });

    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found! Please try again'
      })
    }

    let myBag = await Bag.find({ _id: { $in: currUser.bag } });


    const bagListing = await Listing.find({
      _id: {
        $in: myBag.map(bagItem => bagItem.product)
      }
    },
      {
        productName: true,
        discount: true,
        images: true,
        stock: true
      });

    myBag = myBag.map(bagItems => bagItems.toObject());

    //Append extra info with bag data
    for (let i = 0; i < myBag.length; i++) {
      myBag[i].productName = bagListing[i].productName;
      myBag[i].discount = bagListing[i].discount;
      myBag[i].images = bagListing[i].images;
      myBag[i].stock = bagListing[i].stock;
    }


    // Return response
    return res.status(200).json({
      success: true,
      message: 'Bag fetched sucessfully',
      bag: myBag
    })

  } catch (error) {
    console.log('Integrnal server error in to get bag:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error to get bag courses ,Try again',
    })
  }
}

// ----------------- add to cart handler ----------------
export const addToBag = async (req, res) => {
  try {
    const { listingId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    if (!listingId || !userId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'All feilds are require'
      })
    }

    //First check userPresent
    let currUser = await User.findById({ _id: userId, accountType: 'Buyer' });

    if (!currUser) {
      return res.status(400).json({
        success: false,
        message: 'User not found! Please try again'
      })
    }

    const currBag = await Bag.findOne({ _id: { $in: currUser.bag }, product: listingId })

    if (currBag) {
      return res.status(400).json({
        success: false,
        message: 'Already in present in bag'
      })
    }

    const currListing = await Listing.findById(listingId, { price: true });
    // Create new bag item

    const bagPayLoad = {
      product: currListing._id,
      price: currListing.price,
      quantity
    }

    const currBagItem = await Bag.create(bagPayLoad);

    // if not in bag then push
    currUser = await User.findByIdAndUpdate(
      { _id: userId }, {
      $push: {
        bag: { $each: [currBagItem._id], $position: 0 }
      }
    });


    // Return response
    return res.status(200).json({
      success: true,
      message: 'Add successfully into bag',
      currBagItem
    })

  } catch (error) {
    console.log('Integrnal server error in add to cart:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Internal server error!Try again',
    })
  }
}

// ----------------- Remove to cart handler ----------------
export const removeToBag = async (req, res) => {
  try {

    const { bagId } = req.params;
    const userId = req.user.id;

    if (!bagId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'listing or user not found!'
      })
    }

    let currUser = await User.findOne({ _id: userId, accountType: 'Buyer' });


    if (!currUser?.bag.includes(bagId)) {
      return res.status(400).json({
        success: false,
        message: 'Not found in your bag'
      })
    }

    //pull from bag and delete
    currUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $pull: { bag: bagId }
      }, { new: true })

    await Bag.findByIdAndDelete(bagId);

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Remove successfully from bag',
    })

  } catch (error) {
    console.log('Integrnal server error in remove to bag:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Internal server error!Try again',
    })
  }
}

// ----------------- Increase bag item quantity----------------
export const incQuantity = async (req, res) => {
  try {
    
    const { bagId } = req.params;
    const userId = req.user.id;

    if (!bagId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    const currBagItem = await Bag.findById(bagId).populate('product');

    if (currBagItem.quantity + 1 <= currBagItem.product?.stock) {
       await Bag.findByIdAndUpdate(bagId, {
        $inc: { quantity: 1 }
      },{new:true})

      // Return response
      return res.status(200).json({
        success: true,
        message: 'Item quantity has been increased by one',
      })

    } else {
      return res.status(400).json({
        success: false,
        message: 'You make item limit out of stock'
      })
    }

  } catch (error) {
    console.log('Increase quantity error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error!Try again',
    })
  }
}


// ----------------- Decrese bag item quantity----------------
export const decQuantity = async (req, res) => {
  try {
    const { bagId } = req.params;
    const userId = req.user.id;

    if (!bagId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    const currBagItem = await Bag.findById(bagId);
    if (currBagItem.quantity > 1) {
      await Bag.findByIdAndUpdate(bagId, {
        $inc: { quantity: -1 }
      })
      // Return response
      return res.status(200).json({
        success: true,
        message: 'Item quantity has been decresed by one',
      })

    } else {
      return res.status(400).json({
        success: false,
        message: 'Minimum one item reuired for shop'
      })
    }

  } catch (error) {
    console.log('Decrease quantity error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Internal server error!Try again',
    })
  }
}
