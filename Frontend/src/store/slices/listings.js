import { createSlice } from "@reduxjs/toolkit"

const listingSlice = createSlice({
  name:'listings',
  initialState:[],
  reducers:{
    SetListingData:(state,action)=>{
      return[...action.payload];
    },

    setSingleListing:(state,action)=>{
      return [action.payload];
    },

    deleteListing:(state,action)=>{
      return [...state.filter(listing=>listing._id!==action.payload)]
    }
    }
})

export const listinSlicegAction = listingSlice.actions;
export default listingSlice;