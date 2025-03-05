import axiosInstance from "../helper/axiosInstatance.js";
import toast from "react-hot-toast";
import { fetchSliceAction } from "../store/slices/fetchSlice.js";
import { orderSliceAction } from "../store/slices/order.js";

export const createOrder = async (navigate, dispatch, token) => {
  const toastId = toast.loading("Creating your order...");
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axiosInstance.get(`/order/create`, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      // console.log("CREATE ORDER RESPONSE --->>>", res)
      navigate('/my-order', "")
      setTimeout(() => toast.success(res?.data?.message,
        {
          style: {
            background: '#001a00',
            color: '#f2f2f2',
            borderRadius: '0px',
            width: '500px'
          },
          position: 'bottom-center',
          duration: 3000
        }), 1000)

    }

  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('CREATE ORDER ERROR :', error?.message)
    toast.error(error?.response?.data?.message,
      {
        position: 'right-center', style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '500px'
        },
        duration: 2000
      });

  }
  toast.dismiss(toastId);
}

export const getMyOrder = async (dispatch, token, data) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axiosInstance.post(`/order/my-order`, data, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      console.log("GET MY ORDER RESPONSE --->>>", res);
      dispatch(orderSliceAction.setOrderData(res?.data.currOrders))
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('GET MY ORDER ERROR :', error?.message)
    toast.error(error?.response?.data?.message,
      {
        position: 'right-center', style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '500px'
        },
        duration: 2000
      });

  }
}

export const getAllOrdersForAdmin = async (dispatch, token, data) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axiosInstance.post(`/order/admin`, data, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      console.log("GET MY ORDER RESPONSE --->>>", res);
      dispatch(orderSliceAction.setOrderData(res?.data.currOrders))
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('GET MY ORDER ERROR :', error?.message)
    toast.error(error?.response?.data?.message,
      {
        position: 'right-center', style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '500px'
        },
        duration: 2000
      });

  }
}


export const dateFormate = (date) => {
  let orderDate = new Date(date);
  const day = String(orderDate.getUTCDate()).padStart(2, '0');
  let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let shortMonth = monthNames[orderDate.getUTCMonth()]
  let year = String(orderDate.getUTCFullYear()).padStart(4, '0')

  return  `${day}-${shortMonth}-${year}`
  
}

export const calTotalPrice = (products) => {
  let totalPrice = 0;
  for (let items of products) {
    const price = items?.productId?.price|| 0;
    const discount =(items?.productId?.price && items?.productId?.discount)?(items?.productId?.price * items?.productId?.discount)/100:0;
    totalPrice +=((price - discount) * items.quantity) 
  }
  return Math.floor(totalPrice);
}

export const getOrderDetails = async (dispatch, orderId, token) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axiosInstance.get(`/order/my-order/${orderId}`, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      console.log("GET MY ORDER  DETAILS RESPONSE --->>>", res);
      dispatch(orderSliceAction.setSingleOrder(res?.data.orderDetails));
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('GET MY ORDER  DETAILS  ERROR :', error?.message)
    toast.error(error?.response?.data?.message,
      {
        position: 'right-center', style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '500px'
        },
        duration: 2000
      });

  }
}

export const getOrderDetailsforAdmin = async (dispatch, orderId, token) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axiosInstance.get(`/order/admin/${orderId}`, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      // console.log("GET  ORDER  DETAILS RESPONSE --->>>", res);
      dispatch(orderSliceAction.setSingleOrder(res?.data.orderDetails));
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('GET ORDER  DETAILS  ERROR :', error?.message)
    toast.error(error?.response?.data?.message,
      {
        position: 'right-center', style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '500px'
        },
        duration: 2000
      });

  }
}

export const cancleOrder = async (dispatch, orderId, token,setFetching) => {
  try {
    setFetching(()=>true)
    const res = await axiosInstance.get(`/order/${orderId}/cancle`, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    
    setFetching(()=>false)
    if (res.data && res.data.success) {
      console.log("CANCLE  ORDER  DETAILS RESPONSE --->>>", res);

      dispatch(orderSliceAction.cancleOrder(orderId));
      document.getElementById('my_modal_1').close();
      toast.success(res?.data?.message,
        {
          style: {
            background: '#001a00',
            color: '#f2f2f2',
            borderRadius: '0px',
            width: '30vw'
          },
          position: 'bottom-center',
          duration: 3000
        })
    }
  } catch (error) {
    setFetching(()=>false)
    console.log('CANCLE ORDER  DETAILS  ERROR :', error)
    toast.error(error?.response?.data?.message,
      {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '500px'
        },
        position: 'bottom-center',
        duration: 3000
      })

  }
}

export const setDeliveredOrder = async (dispatch,navigate,orderId,otp,token) => {
  try {
    
    dispatch(fetchSliceAction.serializeFetching())
    const res = await axiosInstance.post(`/order/${orderId}/delivered`,{otp}, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching())
    if (res.data && res.data.success) {
      console.log("SET DELIVERED ORDER RESPONSE --->>>", res);
      dispatch(orderSliceAction.setDelivered(orderId));
      navigate(`/dashbord/admin/orderDetails/${orderId}`)
      setTimeout(()=>{
        toast.success(res?.data?.message,
          {
            style: {
              background: '#001a00',
              color: '#f2f2f2',
              borderRadius: '0px',
              width: '30vw'
            },
            position: 'bottom-center',
            duration: 3000
          })
      },200)
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching())
    console.log('SET DELEVERD ORDER    ERROR :', error)
    toast.error(error?.response?.data?.message,
      {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '500px'
        },
        position: 'bottom-center',
        duration: 3000
      })

  }
}

//Send otp request for user function
export const sendOtp = async (navigate,orderId,setOtpFetching, token, resend)=>{
  try {
    setOtpFetching(()=>true)
    let res = await axiosInstance.get(`/order/${orderId}/otp`,{
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    });
    console.log("SEND OTP RESPONSE ---->>:", res);
    setOtpFetching(()=>false)
    if (res && res.data.success && resend ) {
      toast.success('OTP Regenerated Successfully', { 
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '500px'
        },
        position: 'bottom-center',
        duration: 2000
       });
    }
    if (res && res.data.success && !resend) {
      toast.success('OTP Generated Successfully', { 
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '500px'
        },
        position: 'bottom-center',
        duration: 3000
      });
      navigate(`/dashbord/otp/${orderId}`);
    }
  } catch (err) {
    setOtpFetching(()=>false)
    toast.error(err?.response?.data?.message, {
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '500px'
      },
      position: 'bottom-center',
      duration: 3000
     });
    console.log("Error to send otp request : ", err)
  }
}
