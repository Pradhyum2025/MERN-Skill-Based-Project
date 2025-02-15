import { createSlice } from "@reduxjs/toolkit";

const AddressSlice = createSlice({
  name:'addresses',
  initialState:[],
  reducers:{
    SetAddressData:(state,action)=>{
      return [...action.payload]
    },
    SetSingleAddressData:(state,action)=>{
      console.log('ACTION',action)
      return [...state,action.payload]
    },
    setDefaultAddress:(state,action)=>{
      return state.map(address=>{
        if(address._id===action.payload){
          return {...address,isDefault:true}
        }else{
          return {...address,isDefault:false}
        }
      })
    }
  }
})

export default AddressSlice;
export const AddressSliceAction = AddressSlice.actions;