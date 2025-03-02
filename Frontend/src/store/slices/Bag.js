import { createSlice } from "@reduxjs/toolkit";
const authData = window.localStorage.getItem('currUser')!=='undefined'?JSON.parse(window.localStorage.getItem('currUser')):null;
const initalState = (authData && authData.bag)?authData.bag:[];

const bagSlice = createSlice({
  name: 'bag',
  initialState: initalState,
  reducers: {
    setBagData: (state, action) => {
      return [...action.payload]
    },
    removeToBag: (state, action) => {
      return state.filter(bagItem => bagItem._id != action.payload);
    },
    addToBag: (state, action) => {
      return [action.payload, ...state]
    },
    incQuantity: (state, action) => {
      return state.map(bagItem => 
        bagItem._id === action.payload 
            ? { ...bagItem, quantity: bagItem.quantity+1 } 
            : bagItem  
    );
    },
    decQuantity: (state, action) => {
      return state.map(bagItem => 
          bagItem._id === action.payload 
              ? { ...bagItem, quantity: bagItem.quantity-1 } 
              : bagItem  
      );
  }
  }
})

export default bagSlice;

export const bagSliceAction = bagSlice.actions;