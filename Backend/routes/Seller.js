import express from 'express'

import { isAuth, isSeller } from '../middlewares/auth.js';
import { deleteListing, postNewListing, updateListing, getMyListing } from '../controllers/Seller.js';

const sellerRouter = express.Router();

//post listing
sellerRouter.post('/',isAuth,isSeller,postNewListing);

// delete listings
sellerRouter.delete('/:listingId',isAuth,isSeller,deleteListing);

// edit Listing
sellerRouter.patch('/:listingId',isAuth,isSeller,updateListing);

// edit Listing
sellerRouter.get('/listing',isAuth,isSeller,getMyListing);


export default sellerRouter;