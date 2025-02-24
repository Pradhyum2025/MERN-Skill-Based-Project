import React, { useState, useEffect } from "react";

import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getMyOrder } from "../../../../operations/order";
import { useSelector, useDispatch } from 'react-redux';
import OrderCart from "./OrderCart";

export const SellerOrderHistory = () => {
  const currUser = useSelector(store => store.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (currUser.token) {
      getMyOrder(dispatch, currUser.token,{status:'*'})
    }
  }, []);

  const handleGetFiltersOrder = (e)=>{
    if(currUser.token && e.target.value!==''){
      getMyOrder(dispatch, currUser.token,{status:e.target.value})
    }else{
      return;
    }
  }
  
  const myOrders = useSelector(store => store.orders);
  // console.log(myOrders)
  return (
    <div className="bg-gray-50 sm:px-6 mt-0 w-full">
      <div className="max-w-4xl mx-auto bg-card rounded-lg shadow-sm sm:p-6">

        <div className="flex items-center justify-between">
        <h1 className="text-lg font-[700] text-gray-500 mb-3">MY ORDERS</h1>
       
         <select onChange={(e)=>handleGetFiltersOrder(e)}
         className="font-[600] text-sm border-2 border-blue-400 rounded mb-1" name="" id="">
         <option value="Processing">Pending</option>
         <option value="Shipped">Shipped</option>
         <option value="Delivered">Delivered</option>
         <option value="Cancelled">Cancelled</option>
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
