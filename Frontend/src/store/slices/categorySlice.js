import { createSlice } from "@reduxjs/toolkit";

const categorySlice  = createSlice({
  name:'catagory',
  initialState:[],
  reducers:{
   setCatagory:(state,action)=>{
    return [...action.payload]
   },
   deleteCategory:(state,action)=>{
    return state.filter(category => category._id!== action.payload)
   },
   updateCate:(state,action)=>{
    return [action.payload , ...state];
   }
  }
})

export default categorySlice;

export const categorySliceAction = categorySlice.actions;