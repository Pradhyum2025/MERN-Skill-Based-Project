import express from 'express'

import { createNewAddress, getAddresses, setDefaultAddress } from '../controllers/Address.js';
import { isAuth, isMultiRoll } from '../middlewares/Auth.js';

const addressRoutes = express.Router();

//Add to cart
addressRoutes.get('/',isAuth,getAddresses);

//Add to cart
addressRoutes.post('/',isAuth,isMultiRoll,createNewAddress);

//Remove to cart
addressRoutes.get('/:addressId',isAuth,isMultiRoll,setDefaultAddress);


export default addressRoutes;