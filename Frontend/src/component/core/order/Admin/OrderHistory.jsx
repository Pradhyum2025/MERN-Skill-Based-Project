import React, { useEffect } from "react";
import { getAllOrdersForAdmin } from "../../../../operations/order";
import { useSelector, useDispatch } from 'react-redux';
import OrderCart from "./OrderCart";
import myImage from '../../../../assets/rBgDataNotFound.png';

export const OrderHistory = () => {
  const currUser = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const savedOrderStatus = localStorage.getItem('SelectOrderStatus') ? localStorage.getItem('SelectOrderStatus') : '*';
  useEffect(() => {
    if (currUser.token) {
      getAllOrdersForAdmin(dispatch, currUser.token, { status: savedOrderStatus })
    }
  }, []);

  const myOrders = useSelector(store => store.orders);
  const handleGetFiltersOrder = (e) => {
    if (currUser.token && e.target.value !== '') {
      localStorage.setItem('SelectOrderStatus', e.target.value)
      getAllOrdersForAdmin(dispatch, currUser.token, { status: e.target.value })
    } else {
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
        return "bg-gray-100 text-gray-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
    }
  };
  const fetching = useSelector(store => store.fetching);

  if (fetching) {
    return <div className="min-h-[25rem] bg-background p-6 flex items-center justify-center w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
  }

  return (
    <div className="bg-gray-50 sm:p-6 p-2 w-full pt-10 sm:pt-3">
      <div className="max-w-5xl mx-auto bg-card rounded-lg shadow-sm ">
      <div className="flex items-center justify-between">
              <h1 className="text-lg font-[700] text-gray-500">ORDERS</h1>

              <select
                onChange={(e) => handleGetFiltersOrder(e)}
                defaultValue={savedOrderStatus}
                className={`font-[600] border-[1px] border-yellow-300 focus:ring-0 outline-0 px-5 ${getStatusColor(savedOrderStatus)}`} name="" id="">
                <option className={`${getStatusColor('*')}`} value="*">All Orders</option>
                <option className={`${getStatusColor('Processing')}`} value="Processing">Processing</option>
                <option className={`${getStatusColor('Refunded')}`} value="Refunded">Refunded</option>
                <option className={`${getStatusColor('Delivered')}`} value="Delivered">Delivered</option>
                <option className={`${getStatusColor('Cancelled')}`} value="Cancelled">Cancelled</option>
              </select>
            </div>
        {myOrders.length === 0 ?
          <div>
             <img src={myImage} alt=""  className='sm:aspect-[5/3]'/>
          </div>
          :
          <>
            <div className="overflow-x-auto mt-4">
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
          </>
        }


      </div>
    </div>
  );
};
