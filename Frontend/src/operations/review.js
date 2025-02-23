import axios from "axios"
import { fetchSliceAction } from "../store/slices/fetchSlice"
import toast from "react-hot-toast";
import { reviewSliceAction } from "../store/slices/review";

//Post review
export const postReview = async (dispatch,orderId,listingId, token, reviewData) => {
  try {
     dispatch(fetchSliceAction.serializeFetching());
    let res = await axios.post(`http://localhost:8080/review/${orderId}/${listingId}`, reviewData, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    })
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      // console.log("POST REVIEW RESPONSE --->>>", res)
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'right-center',
        duration:2000
      })
      document.getElementById('my_modal_1').close();
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    toast.error(error?.response?.data?.message, {
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        fontWeight: 900
      },
      position: 'right-center'
    })
    console.log('POST REVIEW ERROR : ', error)
  }

}

//Get reviews
export const getReviews = async (dispatch,listingId) => {
  try {
     dispatch(fetchSliceAction.serializeFetching());
    let res = await axios.get(`http://localhost:8080/review/${listingId}`)
    dispatch(fetchSliceAction.deserializeFetching());
    if (res?.data && res?.data?.success) {
      // console.log("GET REVIEW RESPONSE --->>>", res)
      dispatch(reviewSliceAction.setReviewData(res.data.allReviews))
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    toast.error(error?.response?.data?.message, {
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        fontWeight: 900
      },
      position: 'right-center'
    })
    console.log('GET REVIEW ERROR : ', error)
  }

}

//Delete review
export const deleteReview = async (dispatch,listingId,reviewId,token) => {
  try {
     dispatch(fetchSliceAction.serializeFetching());
    let res = await axios.delete(`http://localhost:8080/review/${listingId}/${reviewId}`,{
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    })
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      // console.log("POST REVIEW RESPONSE --->>>", res)
      dispatch(reviewSliceAction.deleteReview(reviewId))
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'right-center',
        duration:2000
      })
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    toast.error(error?.response?.data?.message, {
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        fontWeight: 900
      },
      position: 'right-center'
    })
    console.log('POST REVIEW ERROR : ', error)
  }

}