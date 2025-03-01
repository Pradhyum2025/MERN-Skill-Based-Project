import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: [],
  reducers: {
    setReviewData: (state, action) => {
      return [...action.payload]
    },
    deleteReview: (state, action) => {
      console.log('hello')
      return state.filter(review => review._id != action.payload);
    },
    setEmpty :(state)=>{
      return [];
    }
  }

  })

export default reviewSlice;

export const reviewSliceAction = reviewSlice.actions;