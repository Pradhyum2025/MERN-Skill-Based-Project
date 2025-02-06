import express from 'express'
let listingRouter = express.Router();

// import { deleteListing, editListing, getAllListings, postNewListing, showListing } from '../controllers/listing.js';
// import { isAuth, isSeller } from '../middlewares/auth.js';

// //get all listings
// listingRouter.get('/',getAllListings);

// //show listing
// listingRouter.get('/show/:product_id',showListing)

// //post listing
// listingRouter.post('/',isAuth,isSeller,postNewListing);

// // delete listings
// listingRouter.delete('/:product_id',isAuth,isSeller,deleteListing);

// //edit Listing
// listingRouter.patch('/:product_id',isAuth,isSeller,editListing);

export default listingRouter;