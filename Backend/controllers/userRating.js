import { CustomerRating } from "../models/customerRating.js";
import { User } from "../models/user.js";
import { Order } from "../models/order.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Create a new customer rating
export const createCustomerRating = async (req, res) => {
  try {
    const {
      customerId,
      orderId,
      requestAccepted,
      productReturnedSame,
      productCondition,
      returnReasonValid,
      originalPackaging,
      overallRating,
      daysToReturn,
      comment,
      imageProof
    } = req.body;

    // Validate required fields
    if (!customerId || !orderId || !requestAccepted || !productReturnedSame || 
        !productCondition || !returnReasonValid || !originalPackaging || 
        !overallRating || daysToReturn === undefined) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Verify seller is authenticated
    const sellerId = req.user.id;
    const seller = await User.findById(sellerId);
    
    if (!seller || seller.accountType !== 'Seller') {
      return res.status(403).json({
        success: false,
        message: 'Only sellers can create customer ratings'
      });
    }

    // Verify customer exists
    const customer = await User.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Verify order exists and belongs to the seller
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if rating already exists for this combination
    const existingRating = await CustomerRating.findOne({
      seller: sellerId,
      customer: customerId,
      order: orderId
    });

    if (existingRating) {
      return res.status(409).json({
        success: false,
        message: 'Rating already exists for this order'
      });
    }

    // Create new customer rating
    const ratingData = {
      seller: sellerId,
      customer: customerId,
      order: orderId,
      requestAccepted,
      productReturnedSame,
      productCondition,
      returnReasonValid,
      originalPackaging,
      overallRating,
      daysToReturn,
      comment,
      imageProof
    };

    const newRating = new CustomerRating(ratingData);
    await newRating.save();

    // Update customer's overall rating using the calculation function
    try {
      const updatedOverallRating = await CustomerRating.updateCustomerOverallRating(
        customerId, 
        ratingData
      );
      
      // You might want to store this updated rating in the User model
      // await User.findByIdAndUpdate(customerId, { customerRating: updatedOverallRating });
      
    } catch (error) {
      console.error('Error updating customer overall rating:', error);
    }

    // Populate the response
    const populatedRating = await CustomerRating.findById(newRating._id)
      .populate('seller', 'firstName lastName companyName')
      .populate('customer', 'firstName lastName email')
      .populate('order', 'createdAt totalAmount');

    return res.status(201).json({
      success: true,
      message: 'Customer rating created successfully',
      rating: populatedRating
    });

  } catch (error) {
    console.error('Error creating customer rating:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get all ratings for a specific customer
export const getCustomerRatings = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // Get customer ratings
    const ratings = await CustomerRating.getCustomerRatings(customerId, parseInt(limit), skip);
    
    // Get customer average rating
    const avgRating = await CustomerRating.getCustomerAverageRating(customerId);

    // Get total count for pagination
    const totalRatings = await CustomerRating.countDocuments({
      customer: customerId,
      status: 'Active'
    });

    return res.status(200).json({
      success: true,
      message: 'Customer ratings retrieved successfully',
      data: {
        ratings,
        averageRating: avgRating,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalRatings / limit),
          totalRatings,
          hasNext: skip + ratings.length < totalRatings,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Error retrieving customer ratings:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get ratings given by a specific seller
export const getSellerRatings = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const ratings = await CustomerRating.find({ seller: sellerId, status: 'Active' })
      .populate('customer', 'firstName lastName email')
      .populate('order', 'createdAt totalAmount')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const totalRatings = await CustomerRating.countDocuments({
      seller: sellerId,
      status: 'Active'
    });

    return res.status(200).json({
      success: true,
      message: 'Seller ratings retrieved successfully',
      data: {
        ratings,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalRatings / limit),
          totalRatings,
          hasNext: skip + ratings.length < totalRatings,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Error retrieving seller ratings:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update a customer rating
export const updateCustomerRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const sellerId = req.user.id;
    const updateData = req.body;

    // Find the rating and verify ownership
    const rating = await CustomerRating.findById(ratingId);
    
    if (!rating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found'
      });
    }

    if (rating.seller.toString() !== sellerId) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own ratings'
      });
    }

    // Update the rating
    const updatedRating = await CustomerRating.findByIdAndUpdate(
      ratingId,
      updateData,
      { new: true, runValidators: true }
    )
    .populate('seller', 'firstName lastName companyName')
    .populate('customer', 'firstName lastName email')
    .populate('order', 'createdAt totalAmount');

    // Recalculate customer's overall rating if overallRating changed
    if (updateData.overallRating) {
      try {
        await CustomerRating.updateCustomerOverallRating(
          rating.customer,
          updatedRating.toObject()
        );
      } catch (error) {
        console.error('Error updating customer overall rating:', error);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Customer rating updated successfully',
      rating: updatedRating
    });

  } catch (error) {
    console.error('Error updating customer rating:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete a customer rating
export const deleteCustomerRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const sellerId = req.user.id;

    // Find the rating and verify ownership
    const rating = await CustomerRating.findById(ratingId);
    
    if (!rating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found'
      });
    }

    if (rating.seller.toString() !== sellerId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own ratings'
      });
    }

    // Soft delete by updating status
    await CustomerRating.findByIdAndUpdate(ratingId, { status: 'Hidden' });

    return res.status(200).json({
      success: true,
      message: 'Customer rating deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting customer rating:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get customer rating statistics
export const getCustomerRatingStats = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Get average rating and stats
    const avgRating = await CustomerRating.getCustomerAverageRating(customerId);
    
    // Get return frequency for current month
    const returnsThisMonth = await CustomerRating.getCustomerReturnsThisMonth(customerId);

    // Get rating distribution
    const ratingDistribution = await CustomerRating.aggregate([
      { $match: { customer: new mongoose.Types.ObjectId(customerId), status: 'Active' } },
      { $group: { _id: '$overallRating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // Get recent ratings
    const recentRatings = await CustomerRating.getCustomerRatings(customerId, 5, 0);

    return res.status(200).json({
      success: true,
      message: 'Customer rating statistics retrieved successfully',
      data: {
        averageRating: avgRating,
        returnsThisMonth,
        ratingDistribution,
        recentRatings
      }
    });

  } catch (error) {
    console.error('Error retrieving customer rating stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get all customers with their ratings (for admin/seller dashboard)
export const getAllCustomersWithRatings = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'averageRating', sortOrder = 'desc' } = req.query;

    const skip = (page - 1) * limit;

    // Get all customers with ratings
    const customers = await User.aggregate([
      { $match: { accountType: 'Buyer' } },
      {
        $lookup: {
          from: 'customerratings',
          localField: '_id',
          foreignField: 'customer',
          as: 'ratings'
        }
      },
      {
        $addFields: {
          averageRating: { $avg: '$ratings.overallRating' },
          totalRatings: { $size: '$ratings' },
          lastRatingDate: { $max: '$ratings.createdAt' }
        }
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          image: 1,
          averageRating: 1,
          totalRatings: 1,
          lastRatingDate: 1
        }
      },
      { $sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 } },
      { $skip: skip },
      { $limit: parseInt(limit) }
    ]);

    const totalCustomers = await User.countDocuments({ accountType: 'Buyer' });

    return res.status(200).json({
      success: true,
      message: 'Customers with ratings retrieved successfully',
      data: {
        customers,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCustomers / limit),
          totalCustomers,
          hasNext: skip + customers.length < totalCustomers,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Error retrieving customers with ratings:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
