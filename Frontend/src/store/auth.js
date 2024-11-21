import { createSlice } from "@reduxjs/toolkit"

let currUser = localStorage.getItem('currUser')==="undefined"?null:localStorage.getItem('currUser');

// console.log(currUser)
const authSlice = createSlice({
  name:'auth',
  initialState: JSON.parse(currUser),
  reducers:{
    initializeAuther:(state,action)=>{
      return action.payload;
    },
    deInializeAuter:(state)=>{
      localStorage.removeItem('currUser');
      localStorage.removeItem('token');
      return null;
    }
  }
})

export const authSliceAction = authSlice.actions;
export default authSlice;