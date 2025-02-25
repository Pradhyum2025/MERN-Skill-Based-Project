import React from 'react'
import { cancleOrder, dateFormate } from '../../../../operations/order'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RxCross2 } from "react-icons/rx";

export default function OrderCart({order,handleCancelOrder}) {
  const currUser = useSelector(store=>store.auth);
  const navigate = useNavigate();



 const handleShowOrderDetails =()=>{
  return navigate(`/my-order/${order._id}`)
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

  return (
    <tr
    key={order._id}
    className={`hover:bg-blue-50 transition-colors border-b-2`}
  >
    <td className="py-4 px-6 text-sm font-[600] text-gray-800">
      <span 
      onClick={handleShowOrderDetails}
      className='cursor-pointer hover:text-gray-700 hover:underline'>#{order._id}</span>
      </td>
    <td className="py-4 px-6 text-sm font-[600] text-gray-800">
      {dateFormate(order.createdAt)}
    </td>
    <td className="py-4 px-6 text-sm font-[600] text-gray-800">
      {order.totalAmount.toFixed(2)}
    </td>
    <td className="py-4 px-6">
      <span class={`${getStatusColor(order.orderStatus)}`}>{order.orderStatus}</span>
    </td>
    <td className="py-4 px-6">
      {order?.paymentStatus.status==='Completed'?
      <span class="bg-green-100 text-green-800 text-xs  me-2 px-2.5 py-0.5 font-[600] rounded-sm ">{order?.paymentStatus.status}</span>:
      <span class="bg-pink-100 text-pink-800 text-xs  me-2 px-2.5 py-0.5 font-[600] rounded-sm ">{order?.paymentStatus.status}</span>
      }
    </td>
    <td className="py-4 px-6">
 
    {order.orderStatus!=='Delivered' && 
      <button
      disabled={order.orderStatus==='Cancelled'}
      onClick={()=>handleCancelOrder(order._id)}
        className="flex px-2 py-1 items-center gap-1 text-sm font-bold text-red-600  rounded-md hover:opacity-90 transition-opacity bg-gray-200 hover:bg-gray-400 hover:text-red-700 disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:text-red-400"
      >
        cancle <RxCross2/>
      </button>
    }
      
      {order.orderStatus==='Delivered' &&
      <button
        className="flex px-4 py-1 items-center gap-1 text-sm font-bold text-yellow-600  rounded-md hover:opacity-90 bg-gray-200 transition-opacity hover:bg-gray-300 hover:text-yellow-700"
      >
        Return
      </button>
      }
    </td>
  </tr>
  )
}
