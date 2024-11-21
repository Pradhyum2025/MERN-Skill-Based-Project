import mongoose from "mongoose";
import { User } from "./user.js";
import connectDB from "../config/connectDB.js";
import { Review } from "./review.js";

connectDB();

const listingSchema = new mongoose.Schema({
  image:{
    type:String,
    default:''
  },
  nameWithModel:{
    type:String
  },
  price:{
    type:Number
  },
  features:[String],
  
  warranty:{
    type:String,
    default:"6 month"
  },
  catagory:{
    type:String,
    enum:['Smartphone','Smartwatch','SmartTv','VR']
  },
  seller:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    reviews:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review"
    }],
    createdAt:{
      type:Date,
      default:Date.now()
    }
})

export const Listing = mongoose.model('Listing',listingSchema);