import { FaCircleCheck } from "react-icons/fa6";
import React from "react";
import axiosInstance from "../helper/axiosInstatance";
import { bagSliceAction } from "../store/slices/Bag";
import toast from "react-hot-toast";

//Add to cart
export const getMyBag = async (dispatch, token) => {

  try {
    const res = await axiosInstance.get('/bag', {
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
    const res = await axiosInstance.post(`/bag/addToBag/${listing._id}`, { quantity }, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    setFetching(() => false)
    if (res.data && res.data.success) {
      console.log("ADD TO BAG RESPONSE --->>>", res)
      dispatch(bagSliceAction.addToBag(res?.data?.currBagItem))
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'bottom-center',
        duration:2000
      })
    }
  } catch (error) {
    setFetching(() => false)
    toast.error(error?.response?.data?.message, {
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        fontWeight: 900
      },
      position: 'bottom-center'
    })

    console.log('Add to cart error : ', error)
  }

}

//Remove to cart
export const removeToBag = async (dispatch, bagId, token, setFetching) => {
  try {
    setFetching(() => true)
    const res = await axiosInstance.get(`/bag/removeToBag/${bagId}`, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    setFetching(() => false)
    if (res.data && res.data.success) {
      // console.log("REMOVE TO BAG RESPONSE --->>>", res)
      dispatch(bagSliceAction.removeToBag(bagId))
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'right-center'
      })
  }
  } catch (error) {
  setFetching(() => false)
  toast.error(error?.response?.data?.message, { position: 'right-bottom', duration: 2000 });
  console.log('Remove to cart error : ', error)
}

}

export const incQuantity = async (dispatch, token, setFetching, bagId) => {
  try {
    const res = await axiosInstance.get(`/bag/incQuantity/${bagId}`, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    if (res.data && res.data.success) {
      // console.log("INCREASE BAG QUANTITY --->>>", res)
      dispatch(bagSliceAction.incQuantity(bagId));
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'right-center'
      })

    }
  } catch (error) {
    toast.error(error?.response?.data?.message, {
      style: {
      background: '#001a00',
      color: '#f2f2f2',
      borderRadius: '0px',
      width: '400px',
      fontWeight: 900
    },
    position: 'right-center' }
  );
    console.log('Increse quantity  error : ', error)
  }

}

export const decQuantity = async (dispatch, token, setFetching, bagId) => {
  try {

    const res = await axiosInstance.get(`/bag/decQuantity/${bagId}`, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    if (res.data && res.data.success) {
      // console.log("DECRESE BAG QUANTITY --->>>", res)
      dispatch(bagSliceAction.decQuantity(bagId));
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'right-center'
      })
    }
  } catch (error) {
    toast.error(error?.response?.data?.message, {  style: {
      background: '#001a00',
      color: '#f2f2f2',
      borderRadius: '0px',
      width: '400px',
      fontWeight: 900
    },
    position: 'right-center'});
    console.log('Decrese quantity error : ', error)
  }

}

export const isPresentInCart = (listing, userBag) => {

  let isPresent = false;
  let isPresentBagId = null;

  for (let bagItem of userBag) {
    if (bagItem?.product._id === listing._id) {
      isPresent = true;
      isPresentBagId = bagItem._id
      break;
    }
  }
  return { isPresent, isPresentBagId };
}

export const calcTotal = (userBag) => {
  let totalPrice = 0;
  let totalSaving = 0;
  let totalItems = 0;
  for (let bagItem of userBag) {
    if (bagItem.product.stock !== 0) {
      totalItems += bagItem.quantity
      totalPrice += bagItem?.product.price ? (bagItem.product.price * bagItem.quantity): 0;
      totalSaving += (bagItem?.product?.discount && bagItem?.product.price) ?
        ((bagItem.product.discount / 100) * bagItem.product.price) * bagItem.quantity : 0;
    }
  }
  return { totalPrice, totalSaving, totalItems };

}


