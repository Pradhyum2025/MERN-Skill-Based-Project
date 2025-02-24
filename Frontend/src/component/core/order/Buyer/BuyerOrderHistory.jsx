import React, { useState, useEffect } from "react";

import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getMyOrder } from "../../../../operations/order";
import { useSelector, useDispatch } from 'react-redux';
import myImage from '../../../../assets/NoOrderFound.jpg';
import OrderCart from "./OrderCart";
import { Link } from "react-router-dom";
import CancleModal from "./CancleOrderModal";


export const BuyerOrderHistory = () => {
  const ordersPerPage = 5;

  const currUser = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [selectedOrderId , setSelectedOrderId] = useState('');

  useEffect(() => {
    if (currUser.token) {
      getMyOrder(dispatch, currUser.token, { status: "*" })
    }
  }, []);


  const handleGetFiltersOrder = (e) => {
    if (currUser.token && e.target.value !== '') {
      getMyOrder(dispatch, currUser.token, { status: e.target.value })
    } else {
      return;
    }
  }
  const fetching = useSelector(store => store.fetching);
  const myOrders = useSelector(store => store.orders);

  const handleCancelOrder = (orderId)=>{
    setSelectedOrderId(orderId);
    return document.getElementById('my_modal_1').showModal();
  }

  if (fetching) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }


  return (
      <div className="bg-gray-50 p-3 sm:p-6 mt-[3.6rem]">
        <div className="max-w-7xl mx-auto bg-card rounded-lg sm:p-6">
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-[700] text-gray-500 mb-3">MY ORDERS</h1>

              <select onChange={(e) => handleGetFiltersOrder(e)}
                className="font-[600] text-sm border-2 border-blue-100 rounded mb-1" name="" id="">
                <option value="*">select status</option>
                <option value="*">All orders</option>
                <option value="Processing">Processing</option>
                <option value="Refunded">Refunded</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            {myOrders.length === 0 ?
              <div className="h-full w-full flex flex-col items-center justify-center bg-white p-5">
                <div className="flex items-center justify-center relative">
                  <p className="text-xl font-bold text-blue-500 text-center  absolute top-[1rem] left-[1rem] ">Orders Not Found</p>
                  <img src={myImage} alt="" className="smh-[30rem] sm:w-[40rem] " />

                </div>
                <Link to={'/'} class="inline-block rounded-lg bg-primary-700 px-3 py-2 text-center font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Shop Now</Link>
              </div>
              :
              <div className="overflow-x-auto min-h-screen">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-orange-300">
                      <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Order Id</th>
                      <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Date</th>
                      <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Amount</th>
                      <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Status</th>
                      <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Payment status</th>
                      <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {myOrders.map((order, index) => {
                      return <OrderCart key={order._id} order={order} handleCancelOrder={handleCancelOrder} />
                    })}
                  </tbody>
                </table>
              </div>

            }
          </div>
        </div>
        <CancleModal orderId={selectedOrderId}/>
      </div>
  );
};
