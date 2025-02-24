import mongoose from "mongoose";
import { mailSender } from "../utils/mailSender.js";
import deliveryConfirmationEmail from "../emailTemplate/deliveryConfirmationTemplate.js";

const otpSchema  = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    trim:true
  },
  orderId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'Order'
  },
  otp:{
    type:Number,
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    expires:10*60
  }

})

//a functiom  -> send email
async function sendVarificationEmail(email,orderId,otp) {
  try{
    const mailResponse = await mailSender(email,'OTP For delivery Confirmation from E-commerce',deliveryConfirmationEmail(orderId,otp))
   
    // console.log('Mail send successfully :',mailResponse);
  }catch(err){
    console.log("error occured while sending mails :",err)
  }
}

//calling pre hook function
otpSchema.pre('save',async function (next) {
  await sendVarificationEmail(this.email,this.order,this.otp);
})

export const  OTP = mongoose.model('OTP',otpSchema);

