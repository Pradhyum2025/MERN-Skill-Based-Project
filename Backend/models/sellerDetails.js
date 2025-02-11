import mongoose from 'mongoose';

const sellerDetailSchema = new mongoose.Schema({

  companyName: {
    type: String,
    required: true,
    trim:true
  },
  about: {
    type: String,
    required: true,
    trim:true
  },
  contact:{
    Type:[Number],
  },
  companyAddress:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Address'
  }]
});

export const SellerDetail = mongoose.model('SellerDetail',sellerDetailSchema);