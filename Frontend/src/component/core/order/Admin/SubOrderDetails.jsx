import React, { useEffect } from 'react'
import { calTotalPrice, dateFormate, getOrderDetails } from '../../../../operations/order';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiRupee } from 'react-icons/bi';
import { FiPrinter, FiDownload } from "react-icons/fi";
import { GiRotaryPhone } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { AiTwotoneShop } from "react-icons/ai";
import { MdMarkEmailRead, MdOutlinePhone } from "react-icons/md";

export default function SellerOrderDetails() {
  const currUser = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (currUser.token && orderId) {
      (dispatch, orderId, currUser.token)
    }
  }, []);

  const orderArray = useSelector(store => store.orders);
  const subOrderDetails = orderArray.length > 0 ? orderArray[0] : null

  const handleNavigatation = (listingId) => {
    return navigate(`/show/${listingId}`)
  }

  if (!subOrderDetails) {
    return;
  }
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm";
      case "pending":
        return "bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm";
      case "shipped":
        return "bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm";
      case "failed":
        return "bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm";
      case "refunded":
        return "bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm";
      case "processing":
        return "bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm";
      case "cancelled":
        return "bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm";
      default:
        return "bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm";
    }
  };
  const time = new Date(subOrderDetails?.createdAt).toLocaleString().split(',')[1];
  return (
    <div className="min-h-screen bg-gray-100 p-4 w-full">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="py-4 rounded-lg flex flex-col gap-y-5">
          {/* Heading */}
          <div className="flex justify-between items-center">
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
          {/* Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className=''>
                <p className="text-yellow-400 text-sm font-semibold sm:pl-3 mb-1">Order ID</p>
                <p className="font-semibold  text-sm text-gray-500">{subOrderDetails?._id}</p>
              </div>

              {/* <div>
                <p className="text-yellow-400 text-sm font-semibold sm:pl-3 mb-1">Seller Id</p>
                <p className="font-semibold  text-sm text-gray-500 flex items-center gap-0">{subOrderDetails?.seller?._id}</p>
              </div> */}

              <div>
                <p className="text-yellow-400 text-sm font-semibold sm:pl-3 mb-1">Order Date</p>
                <p className="font-semibold  text-sm text-gray-500 ">
                  {dateFormate(subOrderDetails?.createdAt) + " " + time}
                </p>
              </div>
              <div>
                <p className="text-yellow-400 font-semibold  text-sm sm:pl-3 mb-0">Status</p>
                <span className={`${getStatusColor(subOrderDetails?.status)}`}>
                  {subOrderDetails.status.toLowerCase()}
                </span>
              </div>

              <div>
                <p className="text-yellow-400 font-semibold  text-sm sm:pl-3 mb-0">Total Ammount</p>
                <span className={`font-semibold  text-sm text-gray-500 flex items-center gap-1 ml-2`}>
                  <BiRupee className='text-md' />
                  {calTotalPrice(subOrderDetails?.products)}
                </span>
              </div>

            </div>

          </div>
          {/* Products */}
          <div className=''>
            <h2 className="text-lg text-gray-700 font-bold mb-3 flex flex-col">PRODUCTS</h2>
            <div className="space-y-4">
              {subOrderDetails?.products && subOrderDetails?.products?.map((orderItem) => (
                <div key={orderItem?.productId?._id} className="flex  flex-row  bg-white items-start gap-4 p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    onClick={() => handleNavigatation(orderItem?.productId?._id)}
                    src={orderItem?.productId?.images?.[0]}
                    alt={orderItem?.productId?.productName}
                    className="w-24 h-24 object-cover rounded cursor-pointer"

                  />
                  <div className="flex flex-col justify-around h-full gap-2">
                    <h3
                      onClick={() => handleNavigatation(orderItem?.productId?._id)}
                      className="font-semibold text-blue-700 cursor-pointer hover:text-blue-600">{orderItem?.productId?.productName}</h3>
                    <p className="text-gray-600  text-sm font-[600] pl-0">Piece : {orderItem?.quantity}</p>
                    <p className="text-gray-600 font-[600] flex text-sm items-center"><BiRupee />{((orderItem?.productId?.price) - (orderItem?.productId?.price * orderItem?.productId?.discount) / 100) + '/-'}
                      <span className='text-xs text-gray-500 font-[500]'>&nbsp; ({+ orderItem?.quantity} Item)</span>
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>
          {/* Seller details */}
          <div className="">
            <h2 className="text-lg font-heading text-gray-600 font-semibold mb-2">SELLER INFO</h2>
            <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
              <p className='text-gray-500 fonr-md font-bold'>Personal Details :</p>
              <div className='flex sm:items-center gap-y-5 sm:gap-10 flex-col sm:flex-row'>
                <p className="text-yellow-600  text-md font-bold flex items-center gap-1"><FaRegUserCircle className='text-blue-600 text-2xl' />{subOrderDetails?.seller?.firstName + " " + subOrderDetails?.seller?.lastName}</p>
                <p className="text-gray-500  text-sm font-semibold flex items-center gap-1"><MdMarkEmailRead className='text-blue-600 text-2xl' />{subOrderDetails?.seller?.email}</p>
                <p className="text-gray-600  text-sm font-bold flex items-center gap-1"><MdOutlinePhone className='text-blue-600 text-xl' />{subOrderDetails?.seller?.contact?.[0]}</p>
              </div>
              <p className='text-gray-500 fonr-md font-bold'>Company / Store / Shop Details :</p>
              <div className='flex items-center gap-2'>
                <p className="text-blue-600  text-2xl  font-semibold"><AiTwotoneShop /></p>
                <p className="text-gray-500  text-[1rem]  font-semibold">{subOrderDetails?.SellerDetails?.companyName}</p>
              </div>
              <div className='flex items-center gap-2'>
                <p className="text-gray-600  text-sm font-semibold"><GiRotaryPhone className='text-blue-500  text-2xl  font-semibold' /></p>
                {subOrderDetails?.SellerDetails?.contact?.map(contact => (
                  <p className="text-gray-500  text-sm text-sm font-semibold">{contact}</p>
                ))}
              </div>

              {/* <div>
                <p className="text-gray-500 text-sm  font-semibold">Delivery Address</p>

                <div className='flex items-center gap-2'>
                  <span className='text-gray-600 text-sm font-[600]'>{subOrderDetails?.deliveryAddress?.firstName + " " + subOrderDetails?.deliveryAddress?.lastName + "  -"}</span>

                  <span className='text-gray-600 text-sm font-[600]'>{subOrderDetails?.deliveryAddress?.contact[0]}</span>
                </div>

                <div className='w-[93%]'>
                  <span className='text-gray-500 text-sm font-[600]'>{subOrderDetails?.deliveryAddress?.streetAddress + ", " + subOrderDetails?.deliveryAddress?.city + ", " + subOrderDetails?.deliveryAddress?.state}</span>
                  <span className='text-gray-500 text-sm font-[600]'>- {subOrderDetails?.deliveryAddress?.postalCode}</span>
                </div>

              </div> */}

            </div>
          </div>

        </div>

      </div>
    </div>

  )
}
