import express from 'express'
import {getAllListings, showListing } from '../controllers/listing.js';

const listingRouter = express.Router();

//get all listings
listingRouter.get('/',getAllListings);

//show listing
listingRouter.get('/show/:listingId',showListing)

export default listingRouter;