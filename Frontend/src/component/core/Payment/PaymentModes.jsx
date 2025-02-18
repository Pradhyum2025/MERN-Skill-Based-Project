import React, { useState } from "react";
import { FaCreditCard, FaPaypal, FaMoneyBillWave, FaMobile } from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";
import { createOrder } from "../../../operations/order";
import { useDispatch, useSelector } from "react-redux";
import LoadingBtn from "../../common/LoadingBtn";
import { capturePayment, verifyPayment } from "../../../operations/payment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const PaymentMethods = () => {
  const currUser= useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("");
  
  //MAKE DELIVERY AFTER PAYMENT
  const handleMakePaymentAndPlaceOrder = async () => {
    let orderData;
    if (currUser.token) {
      orderData = await capturePayment(dispatch,currUser.token)
    } else {
      return toast.error('Please login , after try to buy course')
    }
   
    if (!orderData) {
      alert("Server error. Please try again later.");
      return;
    }

    const options = {
      key: orderData.key, // Replace with your Razorpay Key ID
      amount: orderData.amount,
      currency: "INR",
      name: 'ECOMMERCE',
      description: "Order Payment",
      order_id: orderData.orderId,

      handler: function (response) {
        return verifyPayment(navigate,dispatch,{ ...response},currUser.token)
      },
      prefill: {
        name: orderData.user?.fullName,
        email: orderData?.user?.email,
        contact: orderData?.user?.contact,
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  //MAKE CASH ON DELIVERY
  const handleContinueAndPlaceOrder = ()=>{
   return createOrder(navigate,dispatch,currUser.token);
  }

  const fetching = useSelector(store=>store.fetching);

  return (
    <div className="w-[100%] mx-auto bg-card rounded-lg shadow-sm p-6">

      <div className="mb-8">
        <p className="text-center text-muted-foreground">Choose your preferred payment method</p>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-1  gap-4">
         
            <label
            disabled={!fetching}
              key={'OP'}
              className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${selectedMethod === 'OP'
                  ? "border-ring bg-blue-50"
                  : "border-input hover:border-ring"
                }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  onClick={()=>!fetching && setSelectedMethod('OP')}
                  className={`w-5  h-5 rounded-full  border-2 flex items-center justify-center ${selectedMethod === 'OP' ? "border-blue-500" : "border-input"
                    }`}
                >
                  {selectedMethod === 'OP' && (
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl text-blue-600">{<FaCreditCard/>}</span>
                  <span className="text-sm font-medium text-gray-500">{'Credit Card'}</span> &nbsp;
                  /
                  <span className="text-xl text-blue-600"><FaCreditCard/></span>
                  <span className="text-sm font-medium text-gray-500">{'Debit Card'}</span>  &nbsp;
                   /
                  <span className="text-xl text-blue-600">{<FaMobile/>}</span>
                  <span className="text-sm font-medium text-gray-500">{'UPI'}
                  </span>  &nbsp;
                  /
                  <span className="text-xl text-blue-600"><FaPaypal/></span>
                  <span className="text-sm font-medium text-gray-500">{'Paypal'}</span>
                </div>
              </div>
            </label>

            <label
            disabled={!fetching}
              key={'COD'}
              className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${selectedMethod === 'COD'
                  ? "border-ring bg-blue-50"
                  : "border-input hover:border-ring"
                }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  onClick={()=>!fetching && setSelectedMethod('COD')}
                  className={`w-5  h-5 rounded-full  border-2 flex items-center justify-center ${selectedMethod === 'COD' ? "border-blue-500" : "border-input"
                    }`}
                >
                  {selectedMethod === 'COD' && (
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl text-blue-600"><BsCashStack /></span>
                  <span className="text-sm font-medium text-gray-500">{'Cash on Delivery'}</span>
                </div>
              </div>
            </label>
        
        </div>
      </div>

      <div className="w-full flex items-center justify-end">

        {selectedMethod === 'COD' && (
          <button
          disabled={fetching}
          onClick={handleContinueAndPlaceOrder}
            className='px-4 py-3 w-[40%] border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center disabled:cursor-not-allowed'>
               {fetching?
              <LoadingBtn working={'MAKING ORDER...'}/>
              :
              'CONTINUE AND PLACE ORDER'
              }
          </button>
        )}
        { (selectedMethod !== 'COD' && selectedMethod !== '') && 
          <button
           disabled={fetching}
            onClick={handleMakePaymentAndPlaceOrder}
            className='px-4 py-3 w-[40%] border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center disabled:cursor-not-allowed'>
              {fetching?
              <LoadingBtn working={'PREPARING FOR PAYMENT...'}/>
              :
              'MAKE PAYMENT AND PLACE ORDER'
              }
          </button>
        }
      </div>

    </div>

  );
};
