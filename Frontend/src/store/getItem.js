import { createSlice } from "@reduxjs/toolkit"

const getItemSlice = createSlice({
  name:'Item',
  initialState:{},
  reducers:{
    saveItem:(state,action)=>{
      state = action.payload;
      return state;
    }
  }
})

export const getItemSliceAction = getItemSlice.actions;
export default getItemSlice;