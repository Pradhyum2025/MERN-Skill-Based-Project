import express from 'express'
// import { deleteReview, postReview } from '../controllers/review.js';
// import { auth } from '../middlewares/auth.js';


let reviewRouter = express.Router();

// post review route
// reviewRouter.post("/:listing_id",auth,postReview);

// review delete route
// reviewRouter.delete("/:listing_id/:review_id",auth,deleteReview);


export default reviewRouter;