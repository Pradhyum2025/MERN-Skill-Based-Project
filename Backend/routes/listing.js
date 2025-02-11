import express from 'express'
import {getAllListings, getFilteredListing, showListing } from '../controllers/listing.js';


const listingRouter = express.Router();

//get all listings
listingRouter.get('/',getAllListings);

//show listing
listingRouter.get('/show/:listingId',showListing)


//show listing
listingRouter.get('/filter/:categoryId',getFilteredListing)

export default listingRouter;