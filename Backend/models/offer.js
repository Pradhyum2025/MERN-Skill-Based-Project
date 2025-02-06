import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true, // Image URL is required
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the 'Category' collection
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

const Offer = mongoose.model("Offer", offerSchema);
export default Offer;
