import express from 'express'
import { deleteListing, postNewListing, updateListing, getMyListing ,getAllSellers, getSellerDetailsForAdmin} from '../controllers/Seller.js';
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from '../middlewares/Auth.js';

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
sellerRouter.get('/:sellerId',isAuth,isAdmin,getSellerDetailsForAdmin);

export default sellerRouter;