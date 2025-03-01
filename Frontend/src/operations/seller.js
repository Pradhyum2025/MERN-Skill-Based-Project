import axiosInstance from "../helper/axiosInstatance";
import { sellerSliceAction } from "../store/slices/seller";
import toast from "react-hot-toast";

export const getAllSellers = async(dispatch,token)=>{
  try {
    const res = await axiosInstance.get(`/seller`,{
      headers:{
        'Authorisation':`Bearer ${token}`
      }
    });

    if (res.data && res.data.success) {
      console.log("All Seller Response --->>>", res)
      dispatch(sellerSliceAction.setSellerData(res.data.allSellers));
    }
  } catch (error) {
    console.log('Get all listing error : ', error);
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

export const getSellersDetails = async(dispatch,sellerId,token)=>{
  try {
    const res = await axiosInstance.get(`/seller/${sellerId}`,{
      headers:{
        'Authorisation':`Bearer ${token}`
      }
    });

    if (res.data && res.data.success) {
      console.log("Seller Details Response --->>>", res)
      dispatch(sellerSliceAction.setSingleSeller(res.data.sellerDetals));
    }
  } catch (error) {
    console.log('Get Seller Details error : ', error);
    toast.error(error?.response?.data?.message, { 
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        height:'60px',
        padding:'0px 20px',
        fontWeight: 900
      },
      position: 'bottom-center'
     });
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}