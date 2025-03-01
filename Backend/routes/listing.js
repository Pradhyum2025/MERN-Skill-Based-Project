import express from 'express'
import {getAllListings, getAllListingsforAdmin, getFilteredListing, showListing } from '../controllers/listing.js';
import {isAuth ,isAdmin} from '../middlewares/Auth.js'

const listingRouter = express.Router();

//get all listings
listingRouter.get('/',getAllListings);

//get all listings
listingRouter.get('/admin',isAuth,isAdmin,getAllListingsforAdmin);

//show listing
listingRouter.get('/show/:listingId',showListing)


//show listing
listingRouter.get('/filter/:categoryId',getFilteredListing)

export default listingRouter;