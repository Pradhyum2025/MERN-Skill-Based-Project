import express from 'express'

import { createNewAddress, getAddresses, setDefaultAddress } from '../controllers/Address.js';
import { isAuth, isBuyerOrSeller, isMultiRoll } from '../middlewares/Auth.js';

const addressRoutes = express.Router();

//Add to cart
addressRoutes.get('/',isAuth,isBuyerOrSeller,getAddresses);

//Add to cart
addressRoutes.post('/',isAuth,isMultiRoll,createNewAddress);

//Remove to cart
addressRoutes.get('/:addressId',isAuth,isMultiRoll,setDefaultAddress);


export default addressRoutes;