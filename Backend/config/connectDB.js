import mongoose from "mongoose";
import dotenv from 'dotenv'
//load env file
dotenv.config();

const ATLASDB_URL = process.env.ATLASDB_URL;


export default function connectDB(){

    mongoose.connect(ATLASDB_URL)
    .then(()=>{
      console.log('SuccessFully Connect With MongoDB');
    })
    .catch((err)=>{
    console.log("MongoDB Connection Error : ",err.message);
  })

}