import express from 'express'
import { isAdmin, isAuth,isBuyer } from "../middlewares/Auth.js";
import { capturePayment, varifySignature ,capturePaymentAtDelivery, verifyPaymentAtDelivery} from '../controllers/Payment.js';
const paymentRoutes = express.Router();

//capture payement before order
paymentRoutes.get("/",isAuth,isBuyer,capturePayment);

//capture payement after order at delivery
paymentRoutes.get("/:orderId",isAuth,isAdmin,capturePaymentAtDelivery);

//varifySinganture
paymentRoutes.post('/',isAuth,isBuyer,varifySignature); 

// varifySinganture At delivery
paymentRoutes.post('/:orderId',isAuth,isAdmin,verifyPaymentAtDelivery);

export default paymentRoutes;

