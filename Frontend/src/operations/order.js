import axios from "axios";
import toast from "react-hot-toast";
import { fetchSliceAction } from "../store/slices/fetchSlice";
import { orderSliceAction } from "../store/slices/order";

export const createOrder = async (navigate,dispatch,token) => {
  const toastId = toast.loading("Creating your order...");
  try {
     dispatch(fetchSliceAction.serializeFetching());
    const res = await axios.get(`http://localhost:8080/order/create`,{
      headers: {
        'Authorisation':`Bearer ${token}`
      }
    });
     dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      // console.log("CREATE ORDER RESPONSE --->>>", res)
      navigate('/my-order',"")
      setTimeout(()=>toast(`✅${res?.data?.message}`,
        {
        style:{
          background:'#001a00',
          color:'#f2f2f2',
          borderRadius:'0px',
          width:'500px'
        },
        position:'bottom-center',
        duration:3000
      }),1000)
      
    }
    
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('CREATE ORDER ERROR :',error?.message)
    toast.error(error?.response?.data?.message, 
      { position: 'right-center', style:{
      background:'#001a00',
      color:'#f2f2f2',
      borderRadius:'0px',
      width:'500px'
    },
     duration: 2000 });
    
  }
  toast.dismiss(toastId);
}

export const getMyOrder = async (dispatch,token) => {
  try {
     dispatch(fetchSliceAction.serializeFetching());
    const res = await axios.get(`http://localhost:8080/order/my-order`,{
      headers: {
        'Authorisation':`Bearer ${token}`
      }
    });
     dispatch(fetchSliceAction.deserializeFetching());
     if(res.data && res.data.success){
      console.log("GET MY ORDER RESPONSE --->>>", res);
      dispatch(orderSliceAction.setOrderData(res?.data.currOrders))
    }
    } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('GET MY ORDER ERROR :',error?.message)
    toast.error(error?.response?.data?.message, 
      { position: 'right-center', style:{
      background:'#001a00',
      color:'#f2f2f2',
      borderRadius:'0px',
      width:'500px'
    },
     duration: 2000 });
    
  }
}

export const dateFormate = (date)=>{
  const monthStr = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec']

  const monthIndx = parseInt(date.substring(5,7));
  const yearStr = date.substring(2,4);
  const dateStr = date.substring(8,10);

  return `${dateStr} ${monthStr[monthIndx-1]} ${yearStr}`
}

export const getOrderDetails = async (dispatch,orderId,token)=>{
  try {
    dispatch(fetchSliceAction.serializeFetching());
   const res = await axios.get(`http://localhost:8080/order/my-order/${orderId}`,{
     headers: {
       'Authorisation':`Bearer ${token}`
     }
   });
    dispatch(fetchSliceAction.deserializeFetching());
    if(res.data && res.data.success){
    //  console.log("GET MY ORDER  DETAILS RESPONSE --->>>", res);
     dispatch(orderSliceAction.setSingleOrder(res?.data.orderDetails));
   }
   } catch (error) {
   dispatch(fetchSliceAction.deserializeFetching());
   console.log('CGET MY ORDER  DETAILS  ERROR :',error?.message)
   toast.error(error?.response?.data?.message, 
     { position: 'right-center', style:{
     background:'#001a00',
     color:'#f2f2f2',
     borderRadius:'0px',
     width:'500px'
   },
    duration: 2000 });
   
 }
}