import Listing from "../component/core/Listings/ListingMainPage/Listing";
import axiosInstance from "../helper/axiosInstatance";
import { fetchSliceAction } from "../store/slices/fetchSlice";
import { listinSlicegAction } from "../store/slices/listings";

export const loadData = async (setSerachData) => {
  try {
    let response = await axiosInstance.get('/listing/search');
    let result = response.data.allListings; // Extract data from response
    if(response.data.success){
      setSerachData(result);
      console.log(result)

    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getSearchingList = async(dispatch,listingId)=>{
  console.log(listingId)
  try {
    dispatch(fetchSliceAction.serializeFetching());
    let res = await axiosInstance.get(`/listing/search/${listingId}`);
    
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      let result = res.data.allListings; // Extract data from response
      console.log("GET Searching Listing Response --->>>", res)
      dispatch(listinSlicegAction.SetListingData(result));
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('GET Filter listing error : ', error);
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}


