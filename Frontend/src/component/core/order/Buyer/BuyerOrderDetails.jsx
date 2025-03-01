import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dateFormate, getOrderDetails } from '../../../../operations/order';
import { useNavigate, useParams } from 'react-router-dom';
import { FiPackage, FiTruck, FiCheck, FiAlertCircle, FiPrinter, FiDownload, FiPhone } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import { LiaRupeeSignSolid } from 'react-icons/lia';
import categorySlice from '../../../../store/slices/categorySlice';
import ReviewModal from '../../Reviews/ReviewModal';

export default function BuyerOrderDetails() {
  const currUser = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [selectedListingId, setSelectedListingId] = useState('')


  useEffect(() => {
    if (currUser.token &&  currUser.accountType==='Buyer' && orderId) {
      getOrderDetails(dispatch, orderId, currUser.token)
    }
  }, []);
  const orderArray = useSelector(store => store.orders);
  const orderDetails = orderArray.length > 0 ? orderArray[0] : null

  const handleNavigatation = (listingId) => {
    return navigate(`/show/${listingId}`, { state: { returnPath: `/my-order/${orderDetails._id}` } })
  }


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
  const fetching = useSelector(store => store.fetching);

  if (fetching || !orderDetails) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }


  const handlePostReviewModal = (listingId) => {
    setSelectedListingId(listingId);
    return document.getElementById('my_modal_1').showModal();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8  mt-10">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-yellow-400 text-sm font-semibold sm:pl-3 mb-1">Order ID</p>
              <p className="font-semibold  text-sm text-gray-500">#{orderDetails._id}</p>
            </div>
            <div>
              <p className="text-yellow-400 text-sm font-semibold sm:pl-3 mb-1 ">Order Date</p>
              <p className="font-semibold  text-sm text-gray-500 ">
                <span>{dateFormate(orderDetails.createdAt)}</span>
              </p>
            </div>
            <div>
              <p className="text-yellow-400 font-semibold  text-sm sm:pl-3 mb-0">Status</p>
              <span className={`${getStatusColor(orderDetails.orderStatus)}`}>
                {orderDetails.orderStatus.toLowerCase()}
              </span>
            </div>
            <div>
              <p className="text-yellow-400 text-sm font-semibold sm:pl-3 mb-1">Total Amount</p>
              <p className="font-semibold  text-sm text-gray-500 flex items-center gap-0"><BiRupee /> {orderDetails.totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>


        {/* Product Details */}

        <div className="bg-card py-4 rounded-lg shadow-sm">
          <h2 className="text-lg text-gray-700 font-bold mb-3">Products</h2>
          <div className="space-y-4">
            {orderDetails?.products && orderDetails?.products.map((orderItem) => (
              <div key={orderItem.product?._id} className="flex flex-col md:flex-row  bg-white items-start md:justify-between gap-4 p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                <div className='flex flex-col md:flex-row  items-start md:justify-between gap-4'>
                  <img
                    onClick={() => handleNavigatation(orderItem?.product?._id)}
                    src={orderItem?.product?.images[0]}
                    alt={orderItem?.product?.productName}
                    className="w-24 h-24 object-cover rounded cursor-pointer"
                  />

                  <div className="flex flex-col justify-around h-full gap-2">
                    <h3
                      onClick={() => handleNavigatation(orderItem?.product?._id)}
                      className="font-semibold text-blue-700 cursor-pointer hover:text-blue-600">{orderItem?.product?.productName}</h3>
                    {/* <p className="text-gray-500  text-sm font-[600] pl-0">Items: {orderItem?.quantity}</p> */}
                    <p className="text-gray-600 font-[600] flex text-sm items-center"><BiRupee />{((orderItem?.product?.price) - (orderItem?.product?.price * orderItem?.product?.discount) / 100) + '/-'}
                    </p>
                    <span className='text-xs text-gray-700 font-[600]'>&nbsp;Quantity : {+ orderItem?.quantity}</span>
                  </div>
                </div>

                {(orderDetails.orderStatus==="Delivered" || orderDetails.orderStatus==="Refunded") &&
                <button
                  onClick={() => { handlePostReviewModal(orderItem?.product?._id) }}
                  className="flex px-2 py-1 items-center gap-1 text-sm font-bold text-blue-600  rounded-md hover:opacity-90 transition-opacity bg-gray-200 hover:bg-gray-400 hover:text-blue-700"
                >Review</button>
                }

              </div>
            ))}
          </div>
        </div>

        {/* Payment and Delivery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orderDetails?.paymentStatus?.method === 'COD' ?
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
                  <p className="text-gray-700 text-sm flex items-center"><LiaRupeeSignSolid />{'0.0'}</p>
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
                  <p className="text-gray-500 text-sm  font-semibold">Transaction ID</p>
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
      </div>

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
      <ReviewModal orderId={orderId} listingId={selectedListingId} />
    </div>
  );
};
