import toast from "react-hot-toast";

import axios from "axios";
import { bagSliceAction } from "../store/slices/Bag";

//Add to cart
export const getMyBag = async (dispatch,token) => {

  try {
    const res = await axios.get('http://localhost:8080/bag',{
      headers: {
        'Authorisation':`Bearer ${token}`
      }
    });
    if(res.data && res.data.success) {
      // console.log("GET MY BAG RESPONSE --->>>", res)
      dispatch(bagSliceAction.setBagData(res.data.bag));
    }
  } catch (error) {
    toast.error(error?.response?.data?.message, { position: 'right-bottom', duration: 2000 });
    console.log('Get my bag error : ', error)
  }
}

//Add to cart
export const addToBag = async (dispatch,course,token,setFetching) => {
  try {
    setFetching(()=>true)
    const res = await axios.get(`http://localhost:8080/bag/addToBag/${course._id}`,{
      headers: {
        'Authorisation':`Bearer ${token}`
      }
    });
    setFetching(()=>false)
    if (res.data && res.data.success) {
      // console.log("ADD TO BAG RESPONSE --->>>", res)
      dispatch(bagSliceAction.addToBag(course))
      toast.success(res?.data?.message, { position: 'right-bottom', duration: 2000 });
    }
  } catch (error) {
    setFetching(()=>false)
    toast.error(error?.response?.data?.message, { position: 'right-bottom', duration: 2000 });
    console.log('Login error : ', error)
  }

}

//Remove to cart
export const removeToBag = async (dispatch,courseId,token,setFetching) => {
  try {
    setFetching(()=>true)
    const res = await axios.get(`http://localhost:8080/bag/removeToBag/${courseId}`,{
      headers:{
        'Authorisation':`Bearer ${token}`
      }
    });
    setFetching(()=>false)
    if (res.data && res.data.success) {
      // console.log("REMOVE TO BAG RESPONSE --->>>", res)
      dispatch(bagSliceAction.removeToBag(courseId))
      toast.success(res.data?.message, { position: 'right-bottom', duration: 2000 });
    }
  } catch (error) {
    setFetching(()=>false)
    toast.error(error?.response?.data?.message, { position: 'right-bottom', duration: 2000 });
    console.log('Login error : ', error)
  }

}

export const isPresentInCart = (course,userBag)=>{

  let IsPresent = false;
  for(let bagCourse of userBag){
    if(bagCourse._id === course._id){
      IsPresent = true;
      break;
    }
  }
  return IsPresent;
}

export const calcTotal = (userBag)=>{
  let total = 0;
  for(let bagCourse of userBag){
    total += bagCourse.price?bagCourse.price:0;
  }
  return total;
  
}

