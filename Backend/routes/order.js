import express from 'express'
import { createOrder, getAllOrdersForAdmin, getMyOrder, getOrderDetails, getOrderDetailsforAdmin } from '../controllers/order.js';
import { isAdmin, isAuth, isBuyer, isBuyerOrSelller, isMultiRoll } from '../middlewares/auth.js'

const orderRouter = express.Router();

//Create order
orderRouter.get('/create',isAuth,isBuyer,createOrder);

//get all order
orderRouter.post('/my-order',isAuth,isBuyerOrSelller,getMyOrder)

//get specific order
orderRouter.get('/my-order/:orderId',isAuth,isMultiRoll,getOrderDetails)
 
orderRouter.post('/admin',isAuth,isAdmin,getAllOrdersForAdmin)

orderRouter.get('/admin/:orderId',isAuth,isAdmin,getOrderDetailsforAdmin)
export default orderRouter;