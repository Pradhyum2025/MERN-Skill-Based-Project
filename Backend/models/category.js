import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    relatedImage:{
      type: String,
      required: true,
    },
    listingItems: [
      {
       type:mongoose.Schema.Types.ObjectId,
       ref:'Listing'
      },
    ],
  },
  { timestamps: true } // Adds createdAt & updatedAt
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
