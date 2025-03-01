import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dateFormate, getOrderDetailsforAdmin, sendOtp, } from '../../../../operations/order';
import { useNavigate, useParams } from 'react-router-dom';
import { FiDownload, FiPhone, FiPrinter } from 'react-icons/fi';
import { BiRupee } from 'react-icons/bi';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { capturePaymentAtDelivery, verifyPaymentAtDelivery } from '../../../../operations/payment';
import CancleModal from '../Buyer/CancleOrderModal';
import SubOrderCart from './SubOrderCart';


export default function OrderDetailsForAdmin() {
  const [otpFetching, setOtpFetching] = useState(false);
  const currUser = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    if (currUser.token && currUser.accountType === 'Admin' && orderId) {
      getOrderDetailsforAdmin(dispatch, orderId, currUser.token)
    }
  }, []);

  const orderArray = useSelector(store => store.orders);
  const orderDetails = orderArray.length > 0 ? orderArray?.[0] : null

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
      case "refunded":
        return "bg-yellow-100 text-yellow-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
      case "processing":
        return "bg-blue-100 text-blue-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
      case "cancelled":
        return "bg-red-100 text-red-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
      default:
        return "bg-pink-100 text-pink-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
    }
  };

  //handle payment after delivery
  const handlePaymentAfterDelivery = async () => {
    let orderData;
    if (currUser.token) {
      orderData = await capturePaymentAtDelivery(dispatch, orderId, currUser.token)
    } else {
      return toast.error('Please login , after try to make activity')
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
      description: "Order Payment After delivery",
      order_id: orderData.orderId,

      handler: function (response) {
        return verifyPaymentAtDelivery(dispatch, { ...response }, currUser.token, orderId)
      },
      prefill: {
        name: orderData.customer?.fullName,
        email: orderData?.customer?.email,
        contact: orderData?.customer?.contact,
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };


  if (!orderDetails || orderDetails.orderStatus === undefined || orderDetails.paymentStatus === undefined) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }
  const handleOrderStatus = (e) => {
    if (e.target.value === 'Cancelled' && orderDetails && currUser.token && currUser.accountType === 'Admin') {
      return document.getElementById('my_modal_1').showModal();
    } else if (e.target.value === 'Delivered' && orderDetails && currUser.token && currUser.accountType === 'Admin') {
      return sendOtp(navigate, orderDetails._id, setOtpFetching, currUser.token, false);
    } else {
      return document.getElementById('my_modal_3').showModal();
    }
  }

  const time = new Date(orderDetails?.createdAt).toLocaleString().split(',')[1];
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 w-full">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center  mt-5 sm:mt-0">
          <h1 className="md:text-[1.3rem] font-[900] text-gray-600">ORDER SUMMARY</h1>

          <div className="flex gap-4  justify-end">
            <button className="flex text-[1rem] items-center gap-2 px-4 py-2 bg-primary text-gray-600  font-bold rounded hover:opacity-90 transition-opacity">
              <FiPrinter /> <span className='hidden sm:block'>Print Order</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-gray-100  font-bold rounded hover:opacity-90 transition-opacity">
              <FiDownload /> <span className='hidden sm:block'>Download Invoice</span>
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <p className="text-yellow-400 text-sm font-semibold sm:pl-3 mb-1">Order ID</p>
              <p className="font-semibold  text-sm text-gray-500">#{orderDetails._id}</p>
            </div>
            <div>
              <p className="text-yellow-400 text-sm font-semibold sm:pl-3 mb-1">Order Date</p>
              <p className="font-semibold  text-sm text-gray-500 ">
                <span>{dateFormate(orderDetails?.createdAt)}</span>
                <span className='text-blue-500'>{time}</span>
              </p>
            </div>
            <div>
              <p className="text-yellow-400 font-semibold  text-sm sm:pl-3 mb-0">Status</p>
              <span className={`${orderDetails?.orderStatus && getStatusColor(orderDetails?.orderStatus)}`}>
                {orderDetails?.orderStatus}
              </span>
            </div>
            <div>
              <p className="text-yellow-400 text-sm font-semibold sm:pl-3 mb-1">Total Amount</p>
              <p className="font-semibold  text-sm text-gray-500 flex items-center gap-0"><BiRupee /> {orderDetails?.totalAmount && orderDetails.totalAmount.toFixed(2)}</p>
            </div>
            <div className=''>
              <p className="text-yellow-400 text-sm font-semibold sm:pl-3 mb-1"> Change Order Status</p>
              <select
                className={`${orderDetails?.orderStatus && getStatusColor(orderDetails.orderStatus)} px-3 sm:px-6`}
                onChange={(e) => e.target.value !== orderDetails.orderStatus && handleOrderStatus(e)}
                defaultValue={orderDetails.orderStatus}>
                {orderDetails.orderStatus === 'Cancelled' &&
                  <option className='text-red-500 font-bold' value="Cancelled">Cancelled</option>
                }

                {orderDetails.orderStatus === 'Delivered' &&
                  <option className='text-green-500 font-bold' value="Delivered">Delivered</option>
                }
                {orderDetails.orderStatus == 'Processing' &&
                  ['Cancelled', 'Delivered', 'Processing'].map(status => (
                    <option
                      className={`${status === 'Cancelled' ? 'text-red-500' : (status === 'Delivered' ? 'text-green-500' : 'text-blue-500')} font-bold`} value={status}>{status}</option>
                  ))

                }

              </select>
            </div>
          </div>
        </div>


        {/* Payment and Delivery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">     
          {orderDetails?.paymentStatus?.status === 'Pending' ?
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-heading text-gray-600 font-semibold mb-6 flex items-center gap-5">Payment Details
                <span class="bg-purple-300 text-gray-700 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm ">{'Cash on Delivery'}</span>
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-500 text-sm font-semibold">Payment Method</p>
                  <p className="text-gray-700 text-sm">{orderDetails?.paymentStatus?.method}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500 text-sm font-semibold">Total Paid Amount</p>
                  <p className="text-gray-700 text-sm flex items-center"><LiaRupeeSignSolid />{'0'}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500 text-sm font-semibold">Payment Status</p>
                  <p className="text-gray-700 text-sm flex items-center">{orderDetails?.paymentStatus?.status}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500 text-sm font-semibold line-through">Transaction ID</p>
                  <p className="text-gray-700 text-sm ">{ }</p>
                </div>
                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-500 text-sm font-semibold">Subtotal</p>
                    <p className="text-gray-700 flex text-sm items-center"><LiaRupeeSignSolid />{orderDetails?.totalAmount}</p>
                  </div>

                  <div className="flex justify-between mb-2">
                    <p className="text-gray-500 text-sm font-semibold">Delivery charges</p>
                    <p className='flex items-center text-green-500 gap-1'>
                      <span className="line-through text-sm flex items-center" >
                        <LiaRupeeSignSolid /> 200
                      </span>
                      <span>FREE</span>

                    </p>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-border pt-2">
                    <p className='text-blue-500 font-semibold'>Total Payble Amount</p>
                    <p className='flex items-center text-blue-500'><LiaRupeeSignSolid />{orderDetails.totalAmount}</p>
                  </div>

                </div>
              </div>
            </div>
            :
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-heading text-gray-600 font-semibold mb-6 flex items-center gap-5">Payment Details
                <span class="bg-green-500 text-white text-sm font-medium me-2 px-2.5 py-0.3 rounded-sm ">{orderDetails.paymentStatus.status}</span>
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-gray-500 text-sm  font-semibold">Payment Method</p>
                  <p className="text-gray-700 text-sm ">{orderDetails?.paymentStatus?.method}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500 text-sm  font-semibold">Total Paid Amount</p>
                  <p className="text-gray-700 text-sm  flex items-center"><LiaRupeeSignSolid />{orderDetails?.totalAmount}</p>
                </div>
                <div className="flex justify-between">
                  <p className={`text-gray-500 text-sm  font-semibold ${orderDetails?.paymentStatus.method === 'COD' && orderDetails?.paymentStatus.status === 'Completed' ? 'line-through' : null}`}>Transaction ID</p>
                  <p className="text-gray-700 text-sm ">{orderDetails?.paymentStatus?.transactionId}</p>
                </div>
                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-500 text-sm  font-semibold">Subtotal</p>
                    <p className="text-gray-700  text-sm flex items-center"><LiaRupeeSignSolid />{orderDetails?.totalAmount}</p>
                  </div>

                  <div className="flex justify-between mb-2">
                    <p className="text-gray-500 text-sm  font-semibold">Delivery charges</p>
                    <p className='flex items-center text-sm  text-green-500 gap-1'>
                      <span className="line-through flex items-center" >
                        <LiaRupeeSignSolid /> 200
                      </span>
                      <span>FREE</span>

                    </p>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-border pt-2">
                    <p className='text-blue-500 font-semibold'>Total Payable Amount</p>
                    <p className='flex items-center text-blue-500'><LiaRupeeSignSolid />{orderDetails.totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          }

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-heading text-gray-600 font-semibold mb-6">Delivery Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500  text-sm  font-semibold">Delivery Method</p>
                <p className="text-gray-400  text-sm text-sm font-semibold">{'Home Delivery'}</p>
              </div>
              <div>
                <p className="text-gray-500  text-sm font-semibold">Estimated Delivery</p>
                <p className="text-gray-400  text-sm text-sm font-semibold">{'20/2/2025'}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm  font-semibold">Delivery Address</p>

                <div className='flex items-center gap-2'>
                  <span className='text-gray-600 text-sm font-[600]'>{orderDetails?.deliveryAddress?.firstName + " " + orderDetails?.deliveryAddress?.lastName + "  -"}</span>

                  <span className='text-gray-600 text-sm font-[600]'>{orderDetails?.deliveryAddress?.contact?.[0]}</span>
                </div>

                <div className='w-[93%]'>
                  <span className='text-gray-500 text-sm font-[600]'>{orderDetails?.deliveryAddress?.streetAddress + ", " + orderDetails?.deliveryAddress?.city + ", " + orderDetails?.deliveryAddress?.state}</span>
                  <span className='text-gray-500 text-sm font-[600]'>- {orderDetails?.deliveryAddress?.postalCode}</span>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Payment btn */}
        {orderDetails.orderStatus === 'Processing' && orderDetails.paymentStatus.status === 'Pending' &&
          <div className='bg-white p-4 rounded-lg shadow-sm flex sm:flex-row flex-col  sm:items-center items-start gap-5 justify-around'>
            <p className='text-gray-500 text-md font-semibold'>If customer choose to online payment options at delivery time click and  recieve payment</p>
            <button
              className='px-4 py-3  sm:w-[60%] md:w-[40%] lg:w-[25%] border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-md font-semibold flex items-center justify-center disabled:cursor-not-allowed'
              onClick={handlePaymentAfterDelivery}
            >Click for Online Payment </button>
          </div>
        }

        {/* Sub orders   */}
        <div className="bg-gray-50  w-full">
          <div className="max-w-7xl mx-auto bg-card rounded-lg shadow-sm sm:p-6">
            <h1 className="text-lg font-[700] text-gray-500 mb-3">SUB-ORDERS SUMMARY</h1>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-blue-200">
                    <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Sub-Order Id</th>
                    <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Date</th>
                    <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Sub-Order Status</th>
                    <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {orderDetails?.subOrders?.map((subOrder) => {
                    return <SubOrderCart key={subOrder._id} subOrder={subOrder} />
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
      <CancleModal orderId={orderDetails._id} />

      {/* Need Help Section */}
      <div className="bg-muted p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading mb-2">Need Help?</h2>
            <p className="text-muted-foreground">Contact our customer support team</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            <FiPhone /> Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

