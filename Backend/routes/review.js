import express from 'express';

import { deleteReview, getReviews, postReview } from '../controllers/review.js';
import { isAuth, isBuyer } from '../middlewares/Auth.js';
let reviewRouter = express.Router();

// post review route
reviewRouter.post("/:orderId/:listingId",isAuth,isBuyer,postReview);

// review delete route
reviewRouter.delete("/:listingId/:reviewId",isAuth,isBuyer,deleteReview);

// review get route
reviewRouter.get("/:listingId",getReviews);


export default reviewRouter;