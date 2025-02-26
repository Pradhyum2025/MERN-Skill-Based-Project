import { createSlice } from "@reduxjs/toolkit";

const authData = window.localStorage.getItem('currUser')!=='undefined'?JSON.parse(window.localStorage.getItem('currUser')):null;
const initalState = authData?authData:{};

const authSlice  = createSlice({
  name:'auth',
  initialState:initalState,
  reducers:{
    setFormData:(state,action)=>{
     return {...action.payload}
    },
    setUserData:(state,action)=>{
      return {...action.payload}
    },
    signout:(state)=>{
      if(window.localStorage.getItem('currUser')){
        window.localStorage.removeItem('currUser');
      }
      if(window.localStorage.getItem('SelectOrderStatus')){
        window.localStorage.removeItem('SelectOrderStatus');
      }
      return {};
    }
  }
})

export default authSlice;

export const authSliceAction = authSlice.actions;