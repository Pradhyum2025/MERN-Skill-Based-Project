import React from 'react'
import { dateFormate } from '../../../../operations/order'
import { useNavigate } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux'
import { orderSliceAction } from '../../../../store/slices/order';


export default function SubOrderCart({subOrder}) {
  const currUser = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch =useDispatch();

 const handleShowOrderDetails =()=>{
  if(subOrder?._id){
    dispatch(orderSliceAction.setEmptyOrders());
    return navigate(`/dashbord/admin/sub-orderDetails/${subOrder._id}`)
  }
 }

 const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-800 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm";
    case "pending":
      return "bg-pink-100 text-yellow-800 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm";
    case "picked up by courier":
      return "bg-pink-200 text-pink-800 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm";
    case "cancelled":
      return "bg-red-100 text-red-800 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm";
    default:
      return "bg-blue-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm";
  }
};

  return (
    <tr
    key={subOrder?._id}
    className={`hover:bg-blue-50 transition-colors border-b-2`}
  >
    <td className="py-4 px-6 text-sm font-[600] text-gray-800">
      <span 
      className=''>#{subOrder?._id}</span>
      </td>
    <td className="py-4 px-6 text-sm font-[600] text-gray-800">
      {dateFormate(subOrder?.createdAt)}
    </td>
   
    <td className="py-4 px-6">

      <span className={`${subOrder?.status && subOrder?.status==='Delivered'?getStatusColor('Picked Up by Courier'):getStatusColor(subOrder?.status)}` }>{subOrder?.status && subOrder?.status==='Delivered'?'Picked Up by Courier':subOrder?.status}</span>
    </td>

    <td className="py-4 px-6">
      <button
      onClick={handleShowOrderDetails}
        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:opacity-90 transition-opacity"
      >
        View details
      </button>
    </td>
  </tr>
  )
}
