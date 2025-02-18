import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js';
import bodyParser from 'body-parser';

// import listingRouter from './routes/listing.js';
import userRouter from './routes/user.js';
import cors from 'cors';
import fileUpload from "express-fileupload";


// import reviewRouter from './routes/review.js';
import bagRoutes from './routes/bag.js';
import categoryRoutes from './routes/Category.js';
import listingRouter from './routes/listing.js';
import connectCloudinary from './config/connectCloudinary.js';
import sellerRouter from './routes/Seller.js';
import orderRouter from './routes/order.js';
import addressRoutes from './routes/Address.js';
import paymentRoutes from './routes/Payment.js';

//load env files
dotenv.config();
const app = express();

//parse json data from body
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); // Increase JSON payload size
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(fileUpload({
  useTempFiles: true
}));

//config connectCloudinary
connectCloudinary();


//connect with DB
connectDB();


// routes
app.use('/auth', userRouter);
app.use('/bag',bagRoutes);
app.use('/category',categoryRoutes);
app.use('/listing',listingRouter);
app.use('/seller',sellerRouter);
app.use('/order',orderRouter);
app.use('/address',addressRoutes);
app.use('/payment',paymentRoutes)


const PORT  = process.env.PORT || 4040;
app.listen(PORT,()=>{
  console.log(`Port has listen at port number ${PORT} `)
})

