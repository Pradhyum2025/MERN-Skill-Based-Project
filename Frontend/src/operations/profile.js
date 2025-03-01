import toast from "react-hot-toast";
import { authSliceAction } from "../store/slices/auth.js";
import { fetchSliceAction } from "../store/slices/fetchSlice.js";
import axios from "axios";
import { Children } from "react";

// Edit Profile Details
export const updateProfileDetails = async(dispatch,updatedData,token,setIsEditing)=>{
  try {
    dispatch(fetchSliceAction.serializeFetching())
    const res = await axios.patch(`http://localhost:8080/profile/details`, updatedData, {
      headers:{
        'Authorisation':`Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());
    setIsEditing(()=>false)
    if (res.data && res.data.success) {
      window.localStorage.setItem('currUser', JSON.stringify(res.data.userDetails));
      dispatch(authSliceAction.setFormData(res.data.userDetails));
      // console.log("Profile Details Updation Response  --->>>", res)
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'bottom-center'
      })
    }

  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching())
    toast.error(error.response?.data?.message, {  style: {
      background: '#001a00',
      color: '#f2f2f2',
      borderRadius: '0px',
      width: '400px',
      fontWeight: 900
    },
    position: 'bottom-center' });
    console.log('Category updation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

// Update Profile picture
export const updateProfileImage = async(dispatch,picData,token,setFetching,setPicture)=>{
  try {
    setFetching(()=>true)
    const res = await axios.patch(`http://localhost:8080/profile/picture`, picData, {
      headers:{
        'Authorisation':`Bearer ${token}`,
        'Content-Type':'multipart/form-data'
      }
    });
    setFetching(()=>false)
    if (res.data && res.data.success) {
      window.localStorage.setItem('currUser', JSON.stringify(res.data.userDetails));
      dispatch(authSliceAction.setFormData(res.data.userDetails));
      console.log("Profile Picture Updation Response  --->>>", res)
       toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'bottom-center'
      })
      setPicture(res?.data?.userDetails?.image)
    }

  } catch (error) {
    setFetching(()=>false)
    toast.error(error.response?.data?.message, { 
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        fontWeight: 900
      },
      position: 'bottom-center'
   });
    console.log('Profile picture updation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

// Update Profile picture
export const getMyAccountDetails = async(dispatch,token)=>{
  try {
    dispatch(fetchSliceAction.serializeFetching())
    const res = await axios.get(`http://localhost:8080/profile`,
     {
      headers:{
        'Authorisation':`Bearer ${token}`,
      }
    });
    console.log("Get User acouunt data  --->>>", res)
    dispatch(fetchSliceAction.deserializeFetching())
    if (res.data && res.data.success) {
      window.localStorage.setItem('currUser', JSON.stringify(res.data.userDetails));
      dispatch(authSliceAction.setFormData(res.data.userDetails));
    }

  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching())
    toast.error(error.response?.data?.message, {
      style: {
      background: '#001a00',
      color: '#f2f2f2',
      borderRadius: '0px',
      width: '400px',
      fontWeight: 900
    },
    position: 'right-center'
   });
    console.log('Profile picture updation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}
