import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
   {
    firstName: {
      type: String,
      required: true,
    },
    lastName:{
      type: String,
      required: true,
    },
    contact: {
      type: [Number],
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    landMark: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Address = mongoose.model("Address", addressSchema);
