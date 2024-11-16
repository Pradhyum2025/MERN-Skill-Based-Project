import mongoose from 'mongoose';

import connectDB from '../config/connectDB.js';
connectDB();

const sellerDetailsSchema = new mongoose.Schema({
  store_name: {
    type: String,
    required: true,
  },
  store_description: {
    type: String,
    required: false,
  },
  store_address: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  verified_status: {
    type: Boolean,
    default: false,
  },
});

export const SellerDetails = mongoose.model('SellerDetails',sellerDetailsSchema);