import {configureStore} from '@reduxjs/toolkit'
import listingSlice from './listings'
import getItemSlice from './getItem';
import authSlice from './auth';
import bagSlice from './Bag';
import profileSlice from './profile';
import loadingSlice from './loading';

const appStore = configureStore({
  reducer:{
    listings:listingSlice.reducer,
    Item:getItemSlice.reducer,
    auth:authSlice.reducer,
    bag:bagSlice.reducer,
    profile:profileSlice.reducer,
    loading:loadingSlice.reducer
  }
})

export default appStore;