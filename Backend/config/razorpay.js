import razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config();

const instance = new razorpay({
  key_id:process.env.RAZORPAY_KEY,
  key_secret:process.env.RAZORPAY_SECRET
})

export default instance;