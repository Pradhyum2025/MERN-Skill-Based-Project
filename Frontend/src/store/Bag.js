import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name:'bag',
  initialState:[],
  reducers:{
    inializeBag:(state,action)=>{
      return [...action.payload];
    },
    addToBag:(state,action)=>{
      return [action.payload,...state];
    },
    removeToBag:(state,action)=>{
      return state.filter(item=>item._id!=action.payload);
    },

  }
})

export const bagSliceAction  = bagSlice.actions;
export default bagSlice;