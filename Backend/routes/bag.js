import express from 'express'
import {  isAuth, isBuyer } from '../middlewares/auth.js';
import { addToBag, getMyBag, removeToBag } from '../controllers/Bag.js';

const bagRoutes = express.Router();

//Add to cart
bagRoutes.get('/',isAuth,isBuyer,getMyBag);

//Add to cart
bagRoutes.get('/addToBag/:courseId/',isAuth,isBuyer,addToBag);

//Remove to cart
bagRoutes.get('/removeToBag/:courseId',isAuth,isBuyer,removeToBag);

export default bagRoutes;