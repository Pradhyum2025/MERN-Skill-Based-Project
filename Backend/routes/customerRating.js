import express from 'express';
import { 
  createCustomerRating, 
  getCustomerRatings, 
  getSellerRatings, 
  updateCustomerRating, 
  deleteCustomerRating,
  getCustomerRatingStats,
  getAllCustomersWithRatings
} from '../controllers/userRating.js';
import { isAuth, isSeller, isAdmin } from '../middlewares/auth.js';

const customerRatingRouter = express.Router();

// Create a new customer rating (Only sellers can create ratings)
customerRatingRouter.post('/create', isAuth, isSeller, createCustomerRating);

// Get all ratings for a specific customer (Public or authenticated users)
customerRatingRouter.get('/customer/:customerId', getCustomerRatings);

// Get customer rating statistics (Public or authenticated users)
customerRatingRouter.get('/customer/:customerId/stats', getCustomerRatingStats);

// Get all ratings given by the authenticated seller
customerRatingRouter.get('/seller/my-ratings', isAuth, isSeller, getSellerRatings);

// Update a specific customer rating (Only the seller who created it)
customerRatingRouter.put('/update/:ratingId', isAuth, isSeller, updateCustomerRating);

// Delete a specific customer rating (Only the seller who created it)
customerRatingRouter.delete('/delete/:ratingId', isAuth, isSeller, deleteCustomerRating);

// Get all customers with their ratings (Admin or sellers only)
customerRatingRouter.get('/customers/all', isAuth, getAllCustomersWithRatings);

// Admin-only routes
customerRatingRouter.get('/admin/customers', isAuth, isAdmin, getAllCustomersWithRatings);

export default customerRatingRouter;
