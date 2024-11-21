import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name:'loading',
  initialState:true,
  reducers:{
    initializeLoading:(state)=>{
      return true;
    },
    deinitalizeLoading:(state)=>{
      return false;
    }
  }
})

export const loadingSliceAction  = loadingSlice.actions;
export default loadingSlice;