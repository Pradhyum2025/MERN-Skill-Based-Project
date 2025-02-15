import express from 'express'
import {  isAuth, isBuyer } from '../middlewares/auth.js';
import { addToBag, decQuantity, getMyBag, incQuantity, removeToBag } from '../controllers/Bag.js';

const bagRoutes = express.Router();

//Add to cart
bagRoutes.get('/',isAuth,isBuyer,getMyBag);

//Add to cart
bagRoutes.post('/addToBag/:listingId/',isAuth,isBuyer,addToBag);

//Remove to cart
bagRoutes.get('/removeToBag/:bagId',isAuth,isBuyer,removeToBag);

// incQuantity
bagRoutes.get('/incQuantity/:bagId',isAuth,isBuyer,incQuantity);


bagRoutes.get('/decQuantity/:bagId',isAuth,isBuyer,decQuantity);
export default bagRoutes;