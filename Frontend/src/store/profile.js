import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name:'profile',
  initialState:{},
  reducers:{
    initializeProfile:(state,action)=>{
      state = action.payload
      return state;
    },
    reRenderProfile:(state)=>{
      return state;
    }
  }
})

export const profileSliceAction  = profileSlice.actions;
export default profileSlice;