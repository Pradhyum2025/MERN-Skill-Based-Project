import express from 'express'
import { cancleOrder, createOrder, getAllOrdersForAdmin, getMyOrder, getOrderDetails, getOrderDetailsforAdmin, sendOTP, setDeliveredOrder } from '../controllers/order.js';
import { isAdmin, isAuth, isBuyer, isBuyerOrAdmin, isBuyerOrSeller, isMultiRoll } from '../middlewares/auth.js'


const orderRouter = express.Router();

//Create order
orderRouter.get('/create',isAuth,isBuyer,createOrder);

//get all order
orderRouter.post('/my-order',isAuth,isBuyerOrSeller,getMyOrder)

//get specific order
orderRouter.get('/my-order/:orderId',isAuth,isMultiRoll,getOrderDetails)
 
orderRouter.post('/admin',isAuth,isAdmin,getAllOrdersForAdmin)

orderRouter.get('/admin/:orderId',isAuth,isAdmin,getOrderDetailsforAdmin)

orderRouter.get('/:orderId/cancle',isAuth,isBuyerOrAdmin,cancleOrder);

orderRouter.post('/:orderId/delivered',isAuth,isAdmin,setDeliveredOrder)

orderRouter.get('/:orderId/otp',isAuth,isAdmin,sendOTP)

export default orderRouter;