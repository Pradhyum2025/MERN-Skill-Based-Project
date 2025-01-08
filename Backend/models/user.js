import mongoose from "mongoose";
import connectDB from "../config/connectDB.js";
import { Listing } from "./listing.js";
import { SellerDetails } from "./sellerDetails.js";


const userSchema = new mongoose.Schema({
  username:{
    type:String,
    require:true
  },
  email:{
    type:String,
    unique:true,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  role:{
    type:String,
    enum:['seller','buyer'],
    default:'buyer'
  },
  sellerDetails:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SellerDetails",
    required:function () {
      return this.user_type === 'seller';
    }
  },
  listing:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Listing"
    }
  ],
  bag:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Listing"
    }
  ]
})

export const User = mongoose.model('User',userSchema);