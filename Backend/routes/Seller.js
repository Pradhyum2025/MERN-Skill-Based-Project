import express from 'express'

import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from '../middlewares/auth.js';
import { deleteListing, postNewListing, updateListing, getMyListing ,getAllSellers, getSellersDetailsForAdmin} from '../controllers/Seller.js';

const sellerRouter = express.Router();

//post listing
sellerRouter.post('/',isAuth,isSeller,postNewListing);

// delete listings
sellerRouter.delete('/:listingId',isAuth,isSeller,deleteListing);

// edit Listing
sellerRouter.patch('/:listingId',isAuth,isSeller,updateListing);

// edit Listing
sellerRouter.get('/listing',isAuth,isSeller,getMyListing);

// Get all sellers
sellerRouter.get('/',isAuth,isAdmin,getAllSellers);

// Get all sellers
sellerRouter.get('/:sellerId',isAuth,isSellerOrAdmin,getSellersDetailsForAdmin);

export default sellerRouter;