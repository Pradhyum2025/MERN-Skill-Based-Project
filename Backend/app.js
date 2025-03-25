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
import reviewRouter from './routes/review.js';
import profileRoutes from './routes/Profile.js';
import cookieParser from 'cookie-parser';

//load env files
dotenv.config();
const app = express();

//parse json data from body
app.use(cors({
  // origin:'https://e-commerce-frontend-n6rg.onrender.com',
  origin:'http://localhost:5173',
  credentials:true
}));
app.use(cookieParser());
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
app.use('/payment',paymentRoutes);
app.use('/review',reviewRouter);
app.use('/profile',profileRoutes)


const PORT  = process.env.PORT || 4040;
app.listen(PORT,()=>{
  console.log(`Port has listen at port number ${PORT} `)
})

