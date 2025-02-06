import { createSlice } from "@reduxjs/toolkit";

const bagSlice  = createSlice({
  name:'bag',
  initialState:[],
  reducers:{
    setBagData:(state,action)=>{
     return [...action.payload]
    },
    removeToBag : (state,action)=>{
      return  state.filter(course=>course._id!=action.payload);
    },
    addToBag :(state,action)=>{
      return [action.payload,...state]
    } 
  }
})

export default bagSlice;

export const bagSliceAction = bagSlice.actions;