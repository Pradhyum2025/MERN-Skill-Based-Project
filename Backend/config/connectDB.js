import mongoose from "mongoose";
import dotenv from 'dotenv'
//load env file
dotenv.config();

const MONGODB_URL = process.env.ATLAS_MONGO_URL;


export default function connectDB(){

    mongoose.connect(MONGODB_URL)
    .then(()=>{
      console.log('SuccessFully Connect With MongoDB');
    })
    .catch((err)=>{
    console.log("MongoDB Connection Error : ",err.message);
  })

}