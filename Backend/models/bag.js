import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const bagSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Listing',
    require:true
  },
  price: {
    type: Number,
    min: 0,
    require:true
  },
  quantity: {
    type: Number,
    min: 1,
    require:true
  },
}
)


export const Bag = mongoose.model("Bag", bagSchema);

