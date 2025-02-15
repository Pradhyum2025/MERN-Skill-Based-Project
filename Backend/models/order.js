import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to Buyer (User model)
      required: true,
    },

    deliveryAddress:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Address" 
    }
    ,
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Listing", // Reference to Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 1,
        }
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      method: {
        type: String,
        enum: ["COD", "Credit Card", "Debit Card", "UPI", "PayPal"],
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Refunded"],
        default: "Pending",
      },
      transactionId: {
        type: String,
        default: null, // Store transaction ID if online payment
      },
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"],
      default: "Pending",
    },

    subOrders: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "SubOrder" 
    }],

  },
  
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);



