import { createSlice } from "@reduxjs/toolkit"

const listingSlice = createSlice({
  name:'listings',
  initialState:[],
  reducers:{
    getListings:(state,action)=>{
      return[...action.payload];
    }
  }
})

export const listinSlicegAction = listingSlice.actions;
export default listingSlice;