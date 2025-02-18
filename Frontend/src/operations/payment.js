import axios from "axios";
import toast from "react-hot-toast";
import { fetchSliceAction } from "../store/slices/fetchSlice";

// -------- Razor pay script loader function ----------
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


// -------------- Razor pay order creation handler ----------
export const capturePayment = async (dispatch, token) => {

  dispatch(fetchSliceAction.serializeFetching())
  // Ensure script is loaded
  const isLoaded = await loadRazorpay();
  if (!isLoaded) {
    alert("Failed to load Razorpay. Please check your internet connection.");
    return;
  }

  // After script load make order reuest
  try {
    const res = await axios.get(`http://localhost:8080/payment`, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    })
    dispatch(fetchSliceAction.deserializeFetching())
    // console.log('Payment order creation response --->> :' , res);
    if (res.data?.success) {
      return res.data;
    }

  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching())
    console.log('Payment order creation error : ', error?.message);

    toast.error(res?.data?.message, {
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
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

// -------------- Verify the Payment -----------------
export const verifyPayment = async (navigate, dispatch, bodyData, token) => {
  const toastId = toast.loading("Verifying Payment...");
  try {
    const res = await axios.post(`http://localhost:8080/payment`, bodyData, {
      headers: {
        'Authorisation': `Bearer ${token}`
      }
    })
    // console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", res)
    if (!res.data.success) {
      throw new Error(res.data.message)
    }
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
    navigate('/my-order');

  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error)
    toast.error(res?.data?.message, {
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
  toast.dismiss(toastId)
}