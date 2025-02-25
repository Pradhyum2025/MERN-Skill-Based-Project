
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
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'bottom-center',
        duration: 2000
      })
      navigate('/dashbord');
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    toast.error(error.response?.data?.message, { 
      style: {
      background: '#001a00',
      color: '#f2f2f2',
      borderRadius: '0px',
      width: '400px',
      fontWeight: 900
    },
    position: 'bottom-center',
    duration: 2000});
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
export const deleteLisitng = async (dispatch, token, listingId) => {
  console.log(token)
  try {
    setFetching(() => true)
    let res = await axios.delete(`http://localhost:8080/seller/${listingId}`, {
      headers: {
        'Authorisation': `Bearer ${token}` // Include token as a Bearer token
      }
    })
    setFetching(() => false);
    if (res.data && res.data?.success) {
      // console.log("DELETE USER LISTING RESPONSE --->>>", res)
      dispatch(listinSlicegAction.deleteListing(listingId));
      document.getElementById('my_modal_3').close()
      toast.success(res?.data?.message, { 
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'bottom-center',
        duration: 2000
      });
    }
  } catch (error) {
    setFetching(() => false)
    document.getElementById('my_modal_3').close()
    toast.error(error.response?.data?.message, { 
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        fontWeight: 900
      },
      position: 'bottom-center',
      duration: 2000
    });
    console.log('delete Listing error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

//Get singleListing  
export const getSingleListing = async (dispatch, listingId) => {
  try {
    let res = await axios.get(`http://localhost:8080/listing/show/${listingId}`)

    if (res.data && res.data.success) {
      console.log("GET  SINGLE LISTING RESPONSE --->>>", res)
      dispatch(listinSlicegAction.setSingleListing(res.data.listingData));
    }
  } catch (error) {
    console.log('Get Single Listing Error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

// Update new listing
export const updateListing = async (dispatch, navigate, listingId, formData, token) => {
  try {

    dispatch(fetchSliceAction.serializeFetching());
    // Send request with authorization
    const res = await axios.patch(`http://localhost:8080/seller/${listingId}`, formData, {
      headers: {
        "Authorisation": `Bearer ${token}`, // Pass the user's token
        "Content-Type": "multipart/form-data", // Required for FormData
      },
    });

    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res?.data?.success) {
      console.log("UPDATE LISING RESPONSE --->>>", res)
      toast.success(res?.data?.message, { 
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'bottom-center',
        duration: 2000
       });
      navigate('/dashbord');
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    toast.error(error.response?.data?.message, { 
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        fontWeight: 900
      },
      position: 'bottom-center',
      duration: 2000
    });
    console.log(' UPDATE LISING ERROR : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

export const getFilteredListing = async (dispatch, categoryId) => {

  try {
    const res = await axios.get(`http://localhost:8080/listing/filter/${categoryId}`, {
    });
    if (res.data && res.data.success) {
      console.log("GET Filter Listing Response --->>>", res)
      dispatch(listinSlicegAction.SetListingData(res.data.filteredListings));
    }
  } catch (error) {
    console.log('GET Filter listing error : ', error);
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

export const getAllListings = async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/listing`, {
    });

    if (res.data && res.data.success) {
      // console.log("Get All Listing Response --->>>", res)
      dispatch(listinSlicegAction.SetListingData(res.data.allListings));
    }
  } catch (error) {
    console.log('Get all listing error : ', error);
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

export const getAllListingsForAdmin = async (dispatch,token) => {
  try {
    const res = await axios.get(`http://localhost:8080/listing/admin`, {
      headers: {
        "Authorisation": `Bearer ${token}`,
      },
    });

    if (res.data && res.data.success) {
      console.log("Get All Listing for Admin Response --->>>", res)
      dispatch(listinSlicegAction.SetListingData(res.data.allListings));
    }
  } catch (error) {
    console.log('Get all listing error : ', error);
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}