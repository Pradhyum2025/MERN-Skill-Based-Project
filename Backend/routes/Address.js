import express from 'express'
import { isAuth, isMultiRoll } from '../middlewares/auth.js';
import { createNewAddress, getAddresses, setDefaultAddress } from '../controllers/Address.js';

const addressRoutes = express.Router();

//Add to cart
addressRoutes.get('/',isAuth,getAddresses);

//Add to cart
addressRoutes.post('/',isAuth,isMultiRoll,createNewAddress);

//Remove to cart
addressRoutes.get('/:addressId',isAuth,isMultiRoll,setDefaultAddress);


export default addressRoutes;