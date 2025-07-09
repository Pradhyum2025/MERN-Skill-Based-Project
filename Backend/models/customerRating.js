import mongoose from 'mongoose';

const customerRatingSchema = new mongoose.Schema({
  // The seller who is giving the rating
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the seller (User with accountType 'Seller')
    required: true
  },

  // The customer being rated
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the customer (User with accountType 'Buyer')
    required: true
  },

  // The order this rating is related to
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order", // Reference to the specific order
    required: true
  },

  // Rating given by seller (1-5 scale) - kept for backward compatibility
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: function() {
      return this.overallRating;
    }
  },

  // Comment/feedback about the customer
  comment: {
    type: String,
    trim: true,
    maxlength: 500
  },

  // Return/Request related fields
  requestAccepted: {
    type: String,
    enum: ['Yes', 'No', 'Pending'],
    required: true
  },

  productReturnedSame: {
    type: String,
    enum: ['Yes', 'No', 'Partially'],
    required: true
  },

  productCondition: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Damaged'],
    required: true
  },

  returnReasonValid: {
    type: String,
    enum: ['Yes', 'No', 'Questionable'],
    required: true
  },

  originalPackaging: {
    type: String,
    enum: ['Yes', 'No', 'Partially'],
    required: true
  },

  overallRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  daysToReturn: {
    type: Number,
    required: true,
    min: 0
  },

  imageProof: {
    type: String, // Store image URL or file path
    default: null
  },

  // Timestamp when rating was created
  createdAt: {
    type: Date,
    default: Date.now
  },

  // Timestamp when rating was last updated
  updatedAt: {
    type: Date,
    default: Date.now
  },

  // Status of the rating
  status: {
    type: String,
    enum: ['Active', 'Hidden', 'Disputed'],
    default: 'Active'
  }
});

// Compound index to ensure one rating per seller-customer-order combination
customerRatingSchema.index({ seller: 1, customer: 1, order: 1 }, { unique: true });

// Index for efficient querying
customerRatingSchema.index({ customer: 1, status: 1 });
customerRatingSchema.index({ seller: 1, createdAt: -1 });

// Pre-save middleware to update the updatedAt field and sync rating with overallRating
customerRatingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Sync rating field with overallRating for backward compatibility
  if (this.overallRating && !this.rating) {
    this.rating = this.overallRating;
  }
  
  next();
});

// Helper: Convert number of returns to return frequency score
customerRatingSchema.statics.calculateReturnFrequencyScore = function(returnsThisMonth) {
  if (returnsThisMonth === 0) return 2;
  if (returnsThisMonth === 1) return 1;
  if (returnsThisMonth === 2) return 0;
  if (returnsThisMonth === 3) return -1;
  return -2; // 4 or more returns
};

// Main: Update final customer return score (CRS) between 0–10
customerRatingSchema.statics.calculateCustomerRatingUpdate = function({
  currentRating,              // 0 to 10
  retailerImpact,             // -2 to +2
  returnsThisMonth,           // 0 or more
  disputeScore = 0            // -1 to +1 (optional)
}) {
  // Calculate frequency score
  const returnFrequencyScore = this.calculateReturnFrequencyScore(returnsThisMonth);

  // Weights
  const weights = {
    retailerImpact: 0.4,
    returnFrequencyScore: 0.4,
    disputeScore: 0.2
  };

  // Weighted change
  const delta =
    weights.retailerImpact * retailerImpact +
    weights.returnFrequencyScore * returnFrequencyScore +
    weights.disputeScore * disputeScore;

  // Apply delta and clamp to 0–10
  let newRating = currentRating + delta;
  newRating = Math.max(0, Math.min(10, newRating));

  return parseFloat(newRating.toFixed(2));
};

// Static method to get customer's return count for current month
customerRatingSchema.statics.getCustomerReturnsThisMonth = async function(customerId) {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  
  const endOfMonth = new Date();
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setDate(0);
  endOfMonth.setHours(23, 59, 59, 999);

  const returnsCount = await this.countDocuments({
    customer: customerId,
    createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    status: 'Active'
  });

  return returnsCount;
};

// Static method to calculate retailer impact score based on rating data
customerRatingSchema.statics.calculateRetailerImpact = function(ratingData) {
  const {
    requestAccepted,
    productReturnedSame,
    productCondition,
    returnReasonValid,
    originalPackaging,
    overallRating,
    daysToReturn
  } = ratingData;

  let impactScore = 0;

  // Request acceptance impact
  if (requestAccepted === 'Yes') impactScore += 0.5;
  else if (requestAccepted === 'No') impactScore -= 0.5;

  // Product return condition impact
  if (productReturnedSame === 'Yes') impactScore += 0.3;
  else if (productReturnedSame === 'No') impactScore -= 0.8;
  else if (productReturnedSame === 'Partially') impactScore -= 0.3;

  // Product condition impact
  switch (productCondition) {
    case 'Excellent': impactScore += 0.5; break;
    case 'Good': impactScore += 0.2; break;
    case 'Fair': impactScore -= 0.1; break;
    case 'Poor': impactScore -= 0.5; break;
    case 'Damaged': impactScore -= 1.0; break;
  }

  // Return reason validity impact
  if (returnReasonValid === 'Yes') impactScore += 0.3;
  else if (returnReasonValid === 'No') impactScore -= 0.8;
  else if (returnReasonValid === 'Questionable') impactScore -= 0.3;

  // Original packaging impact
  if (originalPackaging === 'Yes') impactScore += 0.2;
  else if (originalPackaging === 'No') impactScore -= 0.4;
  else if (originalPackaging === 'Partially') impactScore -= 0.1;

  // Overall rating impact (convert 1-5 to -1 to +1)
  const ratingImpact = (overallRating - 3) * 0.3;
  impactScore += ratingImpact;

  // Days to return impact (faster return = better)
  if (daysToReturn <= 7) impactScore += 0.2;
  else if (daysToReturn <= 14) impactScore += 0.1;
  else if (daysToReturn <= 30) impactScore -= 0.1;
  else impactScore -= 0.3;

  // Clamp to -2 to +2
  return Math.max(-2, Math.min(2, parseFloat(impactScore.toFixed(2))));
};

// Static method to update customer's overall rating
customerRatingSchema.statics.updateCustomerOverallRating = async function(customerId, newRatingData) {
  try {
    // Get current customer rating (assume stored elsewhere or calculate from history)
    const currentRating = await this.getCurrentCustomerRating(customerId);
    
    // Get returns this month
    const returnsThisMonth = await this.getCustomerReturnsThisMonth(customerId);
    
    // Calculate retailer impact from the new rating data
    const retailerImpact = this.calculateRetailerImpact(newRatingData);
    
    // Calculate dispute score (you can implement this based on your dispute system)
    const disputeScore = 0; // Default, implement based on your needs
    
    // Calculate new rating
    const newOverallRating = this.calculateCustomerRatingUpdate({
      currentRating,
      retailerImpact,
      returnsThisMonth,
      disputeScore
    });
    
    return newOverallRating;
  } catch (error) {
    console.error('Error updating customer overall rating:', error);
    throw error;
  }
};

// Static method to get current customer rating (implement based on your system)
customerRatingSchema.statics.getCurrentCustomerRating = async function(customerId) {
  // This should return the current overall rating of the customer (0-10)
  // You might store this in the User model or calculate from rating history
  const avgRating = await this.getCustomerAverageRating(customerId);
  
  if (avgRating && avgRating.averageRating) {
    // Convert from 1-5 scale to 0-10 scale
    return (avgRating.averageRating - 1) * 2.5;
  }
  
  return 5; // Default neutral rating
};

// Static method to get average rating for a customer
customerRatingSchema.statics.getCustomerAverageRating = async function(customerId) {
  const result = await this.aggregate([
    { 
      $match: { 
        customer: new mongoose.Types.ObjectId(customerId),
        status: 'Active'
      } 
    },
    {
      $group: {
        _id: '$customer',
        averageRating: { $avg: '$overallRating' },
        totalRatings: { $sum: 1 },
        averageReturnDays: { $avg: '$daysToReturn' },
        acceptedRequests: {
          $sum: {
            $cond: [{ $eq: ['$requestAccepted', 'Yes'] }, 1, 0]
          }
        }
      }
    }
  ]);
  
  return result.length > 0 ? result[0] : null;
};

// Static method to get ratings for a specific customer
customerRatingSchema.statics.getCustomerRatings = async function(customerId, limit = 10, skip = 0) {
  return await this.find({ 
    customer: customerId,
    status: 'Active'
  })
  .populate('seller', 'firstName lastName')
  .populate('order', 'createdAt totalAmount')
  .sort({ createdAt: -1 })
  .limit(limit)
  .skip(skip);
};

export const CustomerRating = mongoose.model('CustomerRating', customerRatingSchema);