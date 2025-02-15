import axios from "axios";
import { sellerSliceAction } from "../store/slices/seller";

export const getAllSellers = async(dispatch,token)=>{
  try {
    const res = await axios.get(`http://localhost:8080/seller`,{
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