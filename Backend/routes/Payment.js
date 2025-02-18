import express from 'express'
import { isAuth,isBuyer } from '../middlewares/Auth.js';
import { capturePayment, varifySignature } from '../controllers/Payment.js';
const paymentRoutes = express.Router();

//capture payement
paymentRoutes.get("/",isAuth,isBuyer,capturePayment);

//varifySinganture
paymentRoutes.post('/',isAuth,isBuyer,varifySignature);

export default paymentRoutes;

