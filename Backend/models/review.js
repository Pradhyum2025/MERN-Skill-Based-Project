//require mongoose package
import mongoose from 'mongoose'

const Schema=mongoose.Schema;

const reviewSchema=new Schema(
    {
        comment:{
            type:String
        },
        rating:{
            type:Number,
            min:1,
            max:5
        },
        createdAt:{
            type:Date,
            default:Date.now()
        },
        customer:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    }
)


export const Review = mongoose.model("Review",reviewSchema);

