import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName:{
    type:String,
    require:true,
    trim:true
  },
  lastName:{
    type:String,
    require:true,
    trim:true
  },
  email:{
    type:String,
    unique:true,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  contact:{
    type:[Number],
  },
  accountType:{
    type:String,
    enum:['Seller','Buyer','Admin'],
    default:'Buyer'
  },
  sellerDetails:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SellerDetail",
    required:function () {
      return this.accountType === 'Seller';
    }
  },
  addresses:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Address"
    }
  ],

  listing:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Listing"
    }
  ],
  bag:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Bag"
    }
  ],
  myOrders:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:()=>this.accountType==='Buyer'?"Order":'SubOrder'
      
    }
  ]
})

export const User = mongoose.model('User',userSchema);