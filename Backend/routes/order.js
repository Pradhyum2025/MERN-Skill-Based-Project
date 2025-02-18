import express from 'express'
import { createOrder, getMyOrder, getOrderDetails } from '../controllers/order.js';
import { isAuth, isBuyer, isMultiRoll } from '../middlewares/Auth.js';

const orderRouter = express.Router();

//Create order
orderRouter.get('/create',isAuth,isBuyer,createOrder);

//get all order
orderRouter.get('/my-order',isAuth,isMultiRoll,getMyOrder)

//get specific order
orderRouter.get('/my-order/:orderId',isAuth,isMultiRoll,getOrderDetails)


export default orderRouter;