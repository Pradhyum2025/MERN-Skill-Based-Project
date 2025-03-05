
import axiosInstance from "../helper/axiosInstatance";
import { fetchSliceAction } from "../store/slices/fetchSlice";
import toast from "react-hot-toast";
import { listinSlicegAction } from "../store/slices/listings";

// Upload new listing
export const postListing = async (dispatch, navigate, productDetails, token,setFetching) => {
  try {

    setFetching(()=>true)
    // Send request with authorization
    const res = await axiosInstance.post(`/seller`, productDetails, {
      headers: {
        "Authorisation": `Bearer ${token}`, // Pass the user's token
        "Content-Type": "multipart/form-data", // Required for FormData
      },
    });

    setFetching(()=>false)
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
    setFetching(()=>false)
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
    console.log('Listing creation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}


//Get my listings
export const getMyListings = async (dispatch, token) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axiosInstance.get('/seller/listing', {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    })
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      // console.log("GET USER LISTING RESPONSE --->>>", res)
      dispatch(listinSlicegAction.SetListingData(res.data.listings));
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('Get my Listing error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

// Delete listing  
export const deleteLisitng = async (dispatch, token, listingId,setFetching,navigate) => {
  console.log(token)
  try {
    setFetching(() => true)
    let res = await axiosInstance.delete(`/seller/${listingId}`, {
      headers: {
        'Authorisation': `Bearer ${token}` // Include token as a Bearer token
      }
    })
    setFetching(() => false);
    if (res.data && res.data?.success) {
      // console.log("DELETE USER LISTING RESPONSE --->>>", res)
      dispatch(listinSlicegAction.deleteListing(listingId));
      document.getElementById('my_modal_1').close()
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
      navigate('/dashbord')
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
    dispatch(fetchSliceAction.serializeFetching())
    let res = await axiosInstance.get(`/listing/show/${listingId}`)

    dispatch(fetchSliceAction.deserializeFetching())
    if (res.data && res.data.success) {
      console.log("GET  SINGLE LISTING RESPONSE --->>>", res)
      dispatch(listinSlicegAction.setSingleListing(res.data.listingData));
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching())
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
    const res = await axiosInstance.patch(`/seller/${listingId}`, formData, {
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

export const getFilteredListing = async (dispatch, categoryId,setNewFetching) => {

  try {
    setNewFetching(()=>true)
    const res = await axiosInstance.get(`/listing/filter/${categoryId}`, {
    });

    setNewFetching(()=>false)
    if (res.data && res.data.success) {
      console.log("GET Filter Listing Response --->>>", res)
      dispatch(listinSlicegAction.SetListingData(res.data.filteredListings));
    }
  } catch (error) {
    setNewFetching(()=>false)
    console.log('GET Filter listing error : ', error);
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

export const getAllListings = async (dispatch) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axiosInstance.get(`/listing`, {
    });
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      // console.log("Get All Listing Response --->>>", res)
      dispatch(listinSlicegAction.SetListingData(res.data.allListings));
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('Get all listing error : ', error);
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

export const getAllListingsForAdmin = async (dispatch, token) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axiosInstance.get(`/listing/admin`, {
      headers: {
        "Authorisation": `Bearer ${token}`,
      },
    });
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      console.log("Get All Listing for Admin Response --->>>", res)
      dispatch(listinSlicegAction.SetListingData(res.data.allListings));
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('Get all listing error : ', error);
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}