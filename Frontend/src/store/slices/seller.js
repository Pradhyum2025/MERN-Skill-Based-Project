import { createSlice } from "@reduxjs/toolkit";

const sellerSlice = createSlice({
  name:'seller',
  initialState:[],
  reducers:{
    setSellerData:(state,action)=>{
      return [...action.payload]
    },
  }
})

export const sellerSliceAction  = sellerSlice.actions;
export default sellerSlice;