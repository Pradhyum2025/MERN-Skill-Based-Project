import toast from "react-hot-toast";
import { AddressSliceAction } from "../store/slices/Address";
import { fetchSliceAction } from "../store/slices/fetchSlice";
import axiosInstance from "../helper/axiosInstatance";

export const postAddress = async (navigate,dispatch,FormData,token,setFetching) => {
  try {
    setFetching(()=>true)
    // Send request with authorization
    const res = await axiosInstance.post(`/address`, FormData, {
      headers: {
        "Authorisation": `Bearer ${token}`, // Pass the user's token
      },
    });

    setFetching(()=>false)
    if (res.data && res.data.success) {
      document.getElementById('my_modal_1').close();
      console.log("CREATE NEW ADDRESS RESPONSE --->>>", res)
      dispatch(AddressSliceAction.SetSingleAddressData(res?.data?.address))
      
      toast.success(res?.data?.message,{
        style:{
          background:'#001a00',
          color:'#f2f2f2',
          borderRadius:'0px',
          width:'500px',
          fontWeight:'500'
        },
        position:'bottom-center'
       })
    
    }
  } catch (error) {
    setFetching(()=>false)
    document.getElementById('my_modal_1').close();
    toast.error(error.response?.data?.message, { 
      style:{
        background:'#001a00',
        color:'#f2f2f2',
        borderRadius:'0px',
        width:'500px',
        fontWeight:'500'
      },
      position:'bottom-center'
    });
    console.log('CREATE NEW ADDRESS ERROR : ', error?.message || error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

//Get my listings
export const getMyAddresses = async (dispatch, token) => {

  try {
    const res = await axiosInstance.get('/address', {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    })
    if (res.data && res.data.success) {
      // console.log("GET USER ADDRESS RESPONSE --->>>", res)
      dispatch(AddressSliceAction.SetAddressData(res?.data?.Addresses))
    }
  } catch (error) {
    console.log('GET USER ADDRESS ERROR : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

// Delete listing  
export const setDefaultAddress = async (dispatch, token, addressId,setFetching) => {
  try {
     setFetching(()=>true)
    // Send request with authorization
    const res = await axiosInstance.get(`/address/${addressId}`, {
      headers: {
        "Authorisation": `Bearer ${token}`, // Pass the user's token
      },
    });

    setFetching(()=>false)
    console.log("SET DEFAULT ADDRESS RESPONSE --->>>", res)
    if (res.data && res.data.success) {
      dispatch(AddressSliceAction.setDefaultAddress(addressId))
      toast.success(`${res?.data?.message}`,{
        style:{
          background:'#001a00',
          color:'#f2f2f2',
          borderRadius:'0px',
          width:'500px',
          fontWeight:'500'
        },
        position:'bottom-center'
       })
    }
  } catch (error) {
    setFetching(()=>false)
    toast.error(error.response?.data?.message, {
      style:{
        background:'#001a00',
        color:'#f2f2f2',
        borderRadius:'0px',
        width:'500px',
        fontWeight:'500'
      },
      position:'bottom-center'
     });
    console.log('SET DEFAULT ADDRESSERROR : ', error?.message || error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}