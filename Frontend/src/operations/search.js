import Listing from "../component/core/Listings/ListingMainPage/Listing";
import axiosInstance from "../helper/axiosInstatance";
import { fetchSliceAction } from "../store/slices/fetchSlice";
import { listinSlicegAction } from "../store/slices/listings";

export const loadData = async (setSerachData,setLoadingSerachData) => {
  try {
    setLoadingSerachData(()=>true)
    let response = await axiosInstance.get('/listing/search');
    let result = response.data.allListings; // Extract data from response
    setLoadingSerachData(()=>false)

    if(response.data.success){
      setSerachData(result);
      setLoadingSerachData(()=>false)
    }
  } catch (error) {
    setLoadingSerachData(()=>true)
    console.error("Error fetching data:", error);
  }
};

export const getSearchingList = async(dispatch,listingId)=>{

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


