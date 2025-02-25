import React, { useState, useEffect } from "react";

import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getMyOrder } from "../../../../operations/order";
import { useSelector, useDispatch } from 'react-redux';
import OrderCart from "./OrderCart";

export const SellerOrderHistory = () => {
  const currUser = useSelector(store => store.auth);
  const savedOrderStatus = localStorage.getItem('SelectOrderStatus')?localStorage.getItem('SelectOrderStatus'):'*';
  const dispatch = useDispatch();
  useEffect(() => {
    if (currUser.token) {
      getMyOrder(dispatch, currUser.token,{status:'*'})
    }
  }, []);

  const handleGetFiltersOrder = (e)=>{
    if(currUser.token && e.target.value!==''){
      localStorage.setItem('SelectOrderStatus',e.target.value)
      getMyOrder(dispatch, currUser.token,{status:e.target.value})
    }else{
      return;
    }
  }
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
      case "picked up by courier":
        return "bg-yellow-100 text-yellow-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
      case "pending":
        return "bg-blue-100 text-blue-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
      case "cancelled":
        return "bg-red-100 text-red-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
      default:
        return "bg-pink-100 text-pink-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
    }
  };

  
  const myOrders = useSelector(store => store.orders);
  // console.log(myOrders)
  return (
    <div className="bg-gray-50 sm:px-6 mt-0 w-full">
      <div className="max-w-5xl mx-auto bg-card rounded-lg shadow-sm sm:p-6">

        <div className="flex items-center justify-between">
        <h1 className="text-lg font-[700] text-gray-500 mb-3">MY ORDERS</h1>
       
         <select onChange={(e)=>handleGetFiltersOrder(e)}
          className={`font-[600] ${getStatusColor(savedOrderStatus)} rounded  outline-0 border-yellow-400 border-[2px] mb-1`}  name="" id="">
         <option className="text-md font-semibold" value="*">All Orders</option>
         <option className="text-md font-semibold" value="Pending">Pending</option>
         <option className="text-md font-semibold" value="Picked Up by Courier">Picked Up by Courier</option>
         <option className="text-md font-semibold" value="Delivered">Delivered</option>
         <option className="text-md font-semibold" value="Cancelled">Cancelled</option>
         </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-orange-300">
                <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Order Id</th>
                <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Order Date</th>
                <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Order Status</th>
                <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Action</th>
              </tr>
            </thead>
  
            <tbody> 
              {myOrders.map((subOrder) => {
                return <OrderCart key={subOrder._id} subOrder={subOrder} />
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
