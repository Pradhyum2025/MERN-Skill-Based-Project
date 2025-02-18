import React from 'react'
import { BiSolidPurchaseTag } from 'react-icons/bi';
import { capturePayment, verifyPayment } from '../../../operations/payment';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function BuyNowBtn({ course }) {
  const currUser = useSelector(store => store.auth);
  const navigate =useNavigate();
  const dispatch = useDispatch();

  const handlePayment = async () => {

    let orderData;
    if (currUser.token) {
      orderData = await capturePayment(course._id, currUser.token)
    } else {
      return toast.error('Please login , after try to buy course')
    }
   
    console.log(orderData)
    if (!orderData) {
      alert("Server error. Please try again later.");
      return;
    }

    const options = {
      key: orderData.key, // Replace with your Razorpay Key ID
      amount: orderData.amount,
      currency: "INR",
      name: orderData.courseName,
      image:orderData.thumbnail,
      description: "Course Payment",
      order_id: orderData.orderId,

      handler: function (response) {
        console.log("Payment Success!", response); // Debugging
        verifyPayment(navigate,dispatch,{ ...response, courseId:course._id }, currUser.token)
        
      },
      prefill: {
        name: `${orderData?.user?.firstname} ${orderData?.user?.lastName}`,
        email: orderData?.user?.email,
        contact:orderData?.user?.contact ,
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div className='w-[50%] flex items-center justify-center'>
      <button
        onClick={handlePayment}
        type='button' class="btn text-white bg-indigo-600 hover:bg-indigo-700  px-3 text-[1rem] font-[600] border-0 min-h-[2rem] h-[2.5rem]">
        Buy now <BiSolidPurchaseTag className='text-[1.4rem]' />
      </button>
    </div>
  )
}
