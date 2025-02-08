
import axios from "axios";
import { fetchSliceAction } from "../store/slices/fetchSlice";
import toast from "react-hot-toast";
import { listinSlicegAction } from "../store/slices/listings";

// Upload new listing
export const postListing = async (dispatch, navigate, productDetails, token) => {
  try {

    dispatch(fetchSliceAction.serializeFetching());
    // Send request with authorization
    const res = await axios.post(`http://localhost:8080/seller`, productDetails, {
      headers: {
        "Authorisation": `Bearer ${token}`, // Pass the user's token
        "Content-Type": "multipart/form-data", // Required for FormData
      },
    });

    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      console.log("CREATE LISING RESPONSE --->>>", res)
      toast.success(res.data.message, { position: 'bottom-right', duration: 2000 });
      navigate('/dashbord');
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    toast.error(error.response?.data?.message, { position: 'bottom-right', duration: 2000 });
    console.log('Category creation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}


//Get my listings
export const getMyListings = async (dispatch, token) => {
  try {
    const res = await axios.get('http://localhost:8080/seller/listing', {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    })
    if (res.data && res.data.success) {
      // console.log("GET USER LISTING RESPONSE --->>>", res)
      dispatch(listinSlicegAction.SetListingData(res.data.listings));
    }
  } catch (error) {
    console.log('Get my Listing error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

// Delete listing  
export const deleteLisitng = async (dispatch, token, listingId,setFetching) => {
  console.log(token)
  try {
    setFetching(()=>true)
    let res = await axios.delete(`http://localhost:8080/seller/${listingId}`, {
      headers: {
        'Authorisation': `Bearer ${token}` // Include token as a Bearer token
      }
    })
    setFetching(()=>false);
    if (res.data && res.data.success) {
      // console.log("DELETE USER LISTING RESPONSE --->>>", res)
      dispatch(listinSlicegAction.deleteListing(listingId));
    }
  } catch (error) {
    setFetching(()=>false)
    console.log('delete Listing error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

//Get singleListing  
export const getSingleListing = async (dispatch,listingId) => {
  try {
    let res = await axios.get(`http://localhost:8080/listing/show/${listingId}`)

    if (res.data && res.data.success) {
      console.log("GET USINGLESER LISTING RESPONSE --->>>", res)
      dispatch(listinSlicegAction.setSingleListing(res.data.listingData));
    }
  } catch (error) {
    console.log('Get Single Listing Error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}