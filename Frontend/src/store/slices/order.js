import { createSlice } from "@reduxjs/toolkit"

const orderSlice = createSlice({
  name:'orders',
  initialState:[],
  reducers:{
    setOrderData:(state,action)=>{
      return[...action.payload];
    },

    setSingleOrder:(state,action)=>{
      return [action.payload];
    }

    }
})

export const orderSliceAction = orderSlice.actions;
export default orderSlice;