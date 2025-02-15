import { FaCircleCheck } from "react-icons/fa6";
import React from "react"; // ✅ Required if using JSX
import axios from "axios";
import { bagSliceAction } from "../store/slices/Bag";
import toast from "react-hot-toast";

//Add to cart
export const getMyBag = async (dispatch, token) => {

  try {
    const res = await axios.get('http://localhost:8080/bag', {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    if (res.data && res.data.success) {
      console.log("GET MY BAG RESPONSE --->>>", res)
      dispatch(bagSliceAction.setBagData(res.data.bag));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message, { position: 'right-bottom', duration: 2000 });
    console.log('Get my bag error : ', error)
  }
}

//Add to cart
export const addToBag = async (dispatch, listing, quantity, token, setFetching) => {
  try {
    setFetching(() => true)
    const res = await axios.post(`http://localhost:8080/bag/addToBag/${listing._id}`, { quantity }, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    setFetching(() => false)
    if (res.data && res.data.success) {
      console.log("ADD TO BAG RESPONSE --->>>", res)
      dispatch(bagSliceAction.addToBag(res?.data?.currBagItem))
      toast(`✅${res?.data?.message}`,{
        style:{
          background:'#001a00',
          color:'#f2f2f2',
          borderRadius:'0px',
          width:'500px'
        },
        position:'right-center'
       })
    }
  } catch (error) {
    setFetching(() => false)
    toast.error(error?.response?.data?.message, { position: 'right-bottom', duration: 2000 });
    console.log('Add to cart error : ', error)
  }

}

//Remove to cart
export const removeToBag = async (dispatch, bagId, token, setFetching) => {
  try {
    setFetching(() => true)
    const res = await axios.get(`http://localhost:8080/bag/removeToBag/${bagId}`, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    setFetching(() => false)
    if (res.data && res.data.success) {
      // console.log("REMOVE TO BAG RESPONSE --->>>", res)
      dispatch(bagSliceAction.removeToBag(bagId))
      toast(`✅${res?.data?.message}`,{
        style:{
          background:'#001a00',
          color:'#f2f2f2',
          borderRadius:'0px',
          width:'500px'
        },
        position:'right-center'
       })
    }
  } catch (error) {
    setFetching(() => false)
    toast.error(error?.response?.data?.message, { position: 'right-bottom', duration: 2000 });
    console.log('Remove to cart error : ', error)
  }

}

export const incQuantity = async(dispatch,token,setFetching,bagId)=>{
  try {
    const res = await axios.get(`http://localhost:8080/bag/incQuantity/${bagId}`, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    if (res.data && res.data.success) {
      // console.log("INCREASE BAG QUANTITY --->>>", res)
      dispatch(bagSliceAction.incQuantity(bagId));
      toast(`✅${res?.data?.message}`,{
        style:{
          background:'#001a00',
          color:'#f2f2f2',
          borderRadius:'0px',
          width:'500px'
        },
        position:'right-center'
       })
    
    }
  } catch (error) {
    toast.error(error?.response?.data?.message, { position: 'right-bottom', duration: 2000 });
    console.log('Increse quantity  error : ', error)
  }

}

export const decQuantity = async(dispatch,token,setFetching,bagId)=>{ 
  try {
   
    const res = await axios.get(`http://localhost:8080/bag/decQuantity/${bagId}`, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    if (res.data && res.data.success) {
      // console.log("DECRESE BAG QUANTITY --->>>", res)
      dispatch(bagSliceAction.decQuantity(bagId));
      toast(`✅${res?.data?.message}`,{
        style:{
          background:'#001a00',
          color:'#f2f2f2',
          borderRadius:'0px',
          width:'500px'
        },
        position:'right-center'
       })
    }
  } catch (error) {
    toast.error(error?.response?.data?.message, { position: 'right-bottom', duration: 2000 });
    console.log('Decrese quantity error : ', error)
  }

}

export const isPresentInCart = (listing, userBag) => {

  let IsPresent = false;
  let isPresentBagId = null;

  for (let bagListing of userBag) {
    if (bagListing.product === listing._id) {
      IsPresent = true;
      isPresentBagId = bagListing._id
      break;
    }
  }
  return {IsPresent,isPresentBagId};
}

export const calcTotal = (userBag) => {
  let totalPrice = 0;
  let totalSaving = 0;
  let totalItems =0;
  for (let bagListing of userBag) {
    if(bagListing.stock!==0){
      totalItems +=bagListing.quantity
      totalPrice += bagListing.price ? bagListing.price* bagListing.quantity : 0;
      totalSaving += (bagListing?.discount && bagListing?.price) ?
        ((bagListing.discount / 100) * bagListing.price)*bagListing.quantity  : 0;
    }
  }
  return { totalPrice, totalSaving,totalItems };

}


