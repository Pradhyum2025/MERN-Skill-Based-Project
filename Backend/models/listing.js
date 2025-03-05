import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },

  brand: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Assuming a separate Category model
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  priceAfterDiscount :{
    type: Number,
    required: true,
    min: 0
  },
  state: {
    type: String,
    enum: ["New", "Used", "Refurbished"],
    default: "New"
  },
  returnPolicy: {
    type: Number,
    required: true,
    min: 0 // Days for return
  },
  images: {
    type: [String], // Array of image URLs
    validate: (v) => Array.isArray(v) && v.length > 0
  },
  features: {
    type: [String], // Array for bullet points or multiple descriptions
    required: true
  },
  productWeight: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  seller:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'User'
  },
  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Review'
    }
  ],
  shippingAddress:{
    type:mongoose.Schema.Types.ObjectId,
      ref:'Address'
  }
}, { timestamps: true });

export const Listing = mongoose.model("Listing", listingSchema);

