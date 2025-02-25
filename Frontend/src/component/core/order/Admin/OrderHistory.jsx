import React, { useEffect } from "react";
import { getAllOrdersForAdmin} from "../../../../operations/order";
import { useSelector, useDispatch } from 'react-redux';
import OrderCart from "./OrderCart";

export const OrderHistory = () => {
  const currUser = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const savedOrderStatus = localStorage.getItem('SelectOrderStatus')?localStorage.getItem('SelectOrderStatus'):'*';
  useEffect(() => {
    if (currUser.token) {
      getAllOrdersForAdmin(dispatch, currUser.token,{status:savedOrderStatus})
    }
  }, []);

  const myOrders = useSelector(store => store.orders);
  const handleGetFiltersOrder = (e)=>{
    if(currUser.token && e.target.value!==''){
      localStorage.setItem('SelectOrderStatus',e.target.value)
      getAllOrdersForAdmin(dispatch, currUser.token,{status:e.target.value})
    }else{
      return;
    }
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
    <div className="bg-gray-50 sm:px-6 mt-0 w-full">
      <div className="max-w-5xl mx-auto bg-card rounded-lg shadow-sm sm:p-6">

        <div className="flex items-center justify-between">
        <h1 className="text-lg font-[700] text-gray-500 mb-3">ORDERS</h1>
       
         <select 
         onChange={(e)=>handleGetFiltersOrder(e)}
         defaultValue={savedOrderStatus}
         className={`font-[600] border-2 border-yellow-400 focus:ring-0 outline-0 px-5 ${getStatusColor(savedOrderStatus)}`} name="" id="">
          <option className={`${getStatusColor('*')}`} value="*">Orders</option>
         <option  className={`${getStatusColor('Processing')}`}value="Processing">Processing</option>
         <option  className={`${getStatusColor('Refunded')}`}value="Refunded">Refunded</option>
         <option  className={`${getStatusColor('Delivered')}`}value="Delivered">Delivered</option>
         <option className={`${getStatusColor('Cancelled')}`} value="Cancelled">Cancelled</option>
         </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-orange-300">
                <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Order Id</th>
                <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Order Date</th>
                <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Order Status</th>
                <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Ammount</th>
                <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Action</th>
              </tr>
            </thead>
  
            <tbody> 
              {myOrders.map((order, index) => {
                return <OrderCart key={order._id} order={order} index={index} />
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
