import {configureStore} from '@reduxjs/toolkit'
import bagSlice from '../slices/Bag';
import fetchSlice from '../slices/fetchSlice';
import authSlice from '../slices/auth';
import categorySlice from '../slices/categorySlice';
import listingSlice from '../slices/listings';
import sellerSlice from '../slices/seller';
import AddressSlice from '../slices/Address';
import orderSlice from '../slices/order';
import reviewSlice from '../slices/review';

const appStore = configureStore({
  reducer:{
   auth:authSlice.reducer,
   bag:bagSlice.reducer,
   fetching:fetchSlice.reducer,
   category:categorySlice.reducer,
   listings:listingSlice.reducer,
   seller:sellerSlice.reducer,
   addresses:AddressSlice.reducer,
   orders:orderSlice.reducer,
   reviews:reviewSlice.reducer
  }
})

export default appStore;