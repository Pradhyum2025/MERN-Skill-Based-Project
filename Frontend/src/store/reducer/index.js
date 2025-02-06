import {configureStore} from '@reduxjs/toolkit'
import bagSlice from '../slices/Bag';
import fetchSlice from '../slices/fetchSlice';
import authSlice from '../auth';

const appStore = configureStore({
  reducer:{
   auth:authSlice.reducer,
   bag:bagSlice.reducer,
   fetching:fetchSlice.reducer,
  }
})

export default appStore;