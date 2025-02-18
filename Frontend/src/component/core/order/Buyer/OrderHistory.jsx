import React, { useState, useEffect } from "react";

import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getMyOrder } from "../../../../operations/order";
import { useSelector, useDispatch } from 'react-redux';
import OrderCart from "./orderCart";

const OrderHistory = () => {
  const ordersPerPage = 5;

  const mockOrders = [
    {
      orderId: "ORD-001",
      orderDate: new Date(2024, 0, 15),
      totalAmount: 299.99,
      status: "completed",
      items: [
        { id: 1, name: "Product 1", quantity: 2, price: 149.99 }
      ]
    },
    {
      orderId: "ORD-002",
      orderDate: new Date(2024, 0, 14),
      totalAmount: 159.99,
      status: "pending",
      items: [
        { id: 2, name: "Product 2", quantity: 1, price: 159.99 }
      ]
    },
    {
      orderId: "ORD-003",
      orderDate: new Date(2024, 0, 13),
      totalAmount: 499.99,
      status: "cancelled",
      items: [
        { id: 3, name: "Product 3", quantity: 1, price: 499.99 }
      ]
    },
  ];

  const currUser = useSelector(store => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currUser.token) {
      getMyOrder(dispatch, currUser.token)
    }
  }, []);

  const myOrders = useSelector(store => store.orders);


  if (myOrders.length===0) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 sm:p-6 mt-10">
      <div className="max-w-7xl mx-auto bg-card rounded-lg shadow-sm sm:p-6">
        <h1 className="text-lg font-[700] text-gray-500 mb-6">MY ORDERS</h1>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
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
                return <OrderCart key={order._id} order={order} index={index} />
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default OrderHistory;