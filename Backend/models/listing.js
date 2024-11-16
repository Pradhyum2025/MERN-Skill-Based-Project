import mongoose from "mongoose";
import { User } from "./user.js";
import connectDB from "../config/connectDB.js";


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
    enum:['smartphone','smartwatch','smartTv']
  },
  seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
})

export const Listing = mongoose.model('Listing',listingSchema);