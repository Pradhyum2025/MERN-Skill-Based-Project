import mongoose from "mongoose";
import { SellerDetail } from "./sellerDetails.js";

const subOrderSchema = new mongoose.Schema({
  order: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Order",
    required: true 
    },

  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, 

  products: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Listing", 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true ,
        min:1
      }
    }
  ],
  status: { 
    type: String, 
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"], 
    default: "Processing" 
  },
  SellerDetails: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SellerDetail', 
  }
},
  { timestamps: true }
);

export const SubOrder = mongoose.model("SubOrder", subOrderSchema);
