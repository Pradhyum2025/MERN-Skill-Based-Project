import React, { useState } from 'react'
import OtpInput from './OtpInput';
import OtpVerifyBtn from './OtpVerifyBtn';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBtn from '../../../common/LoadingBtn';
import { setDeliveredOrder,sendOtp } from '../../../../operations/order';


export default function OTP() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUser = useSelector(store=>store.auth);
  const {orderId} = useParams();
  let [currOtp, setCurrOtp] = useState('');

  //React form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  // ------ handle submit form  ----------
  const onSubmit = async (data) => {
    if (currOtp.length == 4 && currUser.token && currUser.accountType==='Admin' && orderId) {
      return await setDeliveredOrder(dispatch,navigate,orderId,currOtp,currUser.token)
    } else {
      return navigate('/signup')
    }
  }

  //Resend otp finction calling

  const [otpFetching, setOtpFetching] = useState(false);
  const handleResendOtp = () => {
    if (currUser.token && currUser.accountType==='Admin' && orderId) {
      return sendOtp(navigate,orderId,setOtpFetching, currUser.token , true);
    } else {
      return navigate('/signup');
    }
  }
  const fetching = useSelector(store=>store.fetching);
  return (
    <div class="max-w-md min-h-[50vh] mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow m-10">

      {/* ----------  Text paragraph   ------------*/}
      <header class="mb-8">
        <h1 class="text-2xl text-gray-800 font-bold mb-1">Delivery Verification</h1>
        <p class="text-[15px] font-[500] text-slate-600">Collect OTP from user and enter the 4-digit verification code that was sent to user email account.</p>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* ----------  Otp input   ------------*/}
        <OtpInput length={4} setCurrOtp={setCurrOtp} />

        {/* ----------  Verify btn   ------------*/}
         <OtpVerifyBtn />

      </form>
      <div class="text-sm text-slate-500 mt-4 flex items-center justify-center">Didn't receive code?
        <span
          onClick={handleResendOtp}
          class="font-medium text-indigo-500 hover:text-indigo-600 hover:underline cursor-pointer" >
            {otpFetching?
            <LoadingBtn working={'Sending..'}/>
          :
          'Resend'
          }
          </span>
      </div>
    </div>

  )
}
