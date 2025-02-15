import express from 'express'
import { createOrder } from '../controllers/order.js';
import {isAdmin, isAuth, isBuyer}  from '../middlewares/auth.js'
import { isOutOfStock } from '../middlewares/order.js';

const orderRouter = express.Router();

//Create order
orderRouter.post('/',isAuth,isBuyer,isOutOfStock,createOrder);

//get all ordera
orderRouter.get('/',isAuth,isAdmin)

//get specific ordera
orderRouter.get('/:orderId',isAuth)


export default orderRouter;