import express from 'express'
import {getAllListingForSearching, getAllListings, getAllListingsforAdmin, getBrandListings, getFilteredListing, getSearchingList, showListing } from '../controllers/listing.js';
import {isAuth ,isAdmin} from '../middlewares/auth.js'

const listingRouter = express.Router();

//get all listings
listingRouter.get('/',getAllListings);

listingRouter.post('/brand',getBrandListings);

listingRouter.get('/search',getAllListingForSearching)

listingRouter.get('/search/:listingId',getSearchingList)

//get all listings
listingRouter.get('/admin',isAuth,isAdmin,getAllListingsforAdmin);

//show listing
listingRouter.get('/show/:listingId',showListing)


//show listing
listingRouter.get('/filter/:categoryId',getFilteredListing)

export default listingRouter;