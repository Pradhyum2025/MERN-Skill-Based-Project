import mongoose from 'mongoose';

const sellerDetailSchema = new mongoose.Schema({

  companyName: {
    type: String,
    required: true,
    trim: true
  },
  about: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
   type:[Number]
  },
  
});

export const SellerDetail = mongoose.model('SellerDetail', sellerDetailSchema);