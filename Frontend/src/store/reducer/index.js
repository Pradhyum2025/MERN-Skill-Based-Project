import {configureStore} from '@reduxjs/toolkit'
import bagSlice from '../slices/Bag';
import fetchSlice from '../slices/fetchSlice';
import authSlice from '../slices/auth';
import categorySlice from '../slices/categorySlice';
import listingSlice from '../slices/listings';

const appStore = configureStore({
  reducer:{
   auth:authSlice.reducer,
   bag:bagSlice.reducer,
   fetching:fetchSlice.reducer,
   category:categorySlice.reducer,
   listings:listingSlice.reducer
  }
})

export default appStore;