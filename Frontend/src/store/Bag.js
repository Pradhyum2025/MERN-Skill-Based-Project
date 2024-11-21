import { createSlice } from "@reduxjs/toolkit";
let currUser = localStorage.getItem('currUser')==="undefined"?null:localStorage.getItem('currUser');

const bagSlice = createSlice({
  name:'bag',
  initialState:currUser?JSON.parse(currUser).bag.length:0,
  reducers:{
    inializeBag:(state,action)=>{
       return action.payload;
    },
    addToBag:(state)=>{
      return state+1;
    },
    removeToBag:(state)=>{
      return state-1;
    }
  }
})

export const bagSliceAction  = bagSlice.actions;
export default bagSlice;