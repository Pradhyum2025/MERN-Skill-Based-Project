import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.js';
import bodyParser from 'body-parser';
import listingRouter from './routes/listing.js';
import userRouter from './routes/user.js';
import cors from 'cors';
import reviewRouter from './routes/review.js';

//load env files
dotenv.config();
const app = express();

//parse json data from body
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

//connect with DB
connectDB();


// routes

app.use('/listing/review',reviewRouter);
app.use('/listing',listingRouter);
app.use('/user', userRouter);

const PORT  = process.env.PORT || 4040;
app.listen(PORT,()=>{
  console.log(`Port has listen at port number ${PORT} `)
})

