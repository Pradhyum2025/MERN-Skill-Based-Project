import React from 'react'
import { dateFormate } from '../../../../operations/order'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function OrderCart({order,index}) {
  const currUser = useSelector(store=>store.auth);
  const navigate = useNavigate();

 const handleShowOrderDetails =()=>{
  return navigate(`/my-order/${order._id}`)
 }

  return (
    <tr
    key={order._id}
    className={`hover:bg-blue-100 transition-colors border-b-2`}
  >
    <td className="py-4 px-6 text-sm font-[600] text-gray-800">
      <span 
      onClick={handleShowOrderDetails}
      className='cursor-pointer hover:text-gray-700 hover:underline'>{order._id}</span>
      </td>
    <td className="py-4 px-6 text-sm font-[600] text-gray-800">
      {dateFormate(order.createdAt)}
    </td>
    <td className="py-4 px-6 text-sm font-[600] text-gray-800">
      {order.totalAmount.toFixed(2)}
    </td>
    <td className="py-4 px-6">

      {order.orderStatus==='Processing'?
      <span class="bg-blue-100 text-blue-800 text-xs  me-2 px-2.5 py-0.5 font-[600] rounded-sm ">{order.orderStatus}</span>:
      null}
    </td>

    <td className="py-4 px-6">
      {order?.paymentStatus.status==='Completed'?
      <span class="bg-green-100 text-green-800 text-xs  me-2 px-2.5 py-0.5 font-[600] rounded-sm ">{order?.paymentStatus.status}</span>:
      <span class="bg-pink-100 text-pink-800 text-xs  me-2 px-2.5 py-0.5 font-[600] rounded-sm ">{order?.paymentStatus.status}</span>
      }
    </td>

    <td className="py-4 px-6">
      <button
        className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:opacity-90 transition-opacity"
      >
        cancle
      </button>
    </td>
  </tr>
  )
}
