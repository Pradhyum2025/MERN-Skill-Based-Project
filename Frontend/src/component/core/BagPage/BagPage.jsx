import React, { useEffect, useState } from "react";
import { BagCard } from "./BagCard";
import { useDispatch, useSelector } from 'react-redux';
import { calcTotal, getMyBag } from "../../../operations/bag";
import { createOrder } from "../../../operations/order";
import { LiaRupeeSignSolid } from "react-icons/lia";
import CreateAddressModal from "../Address/CreateAddressModal";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../common/Navbar";
import Footer from "../../common/Footer";
import { Toaster } from "react-hot-toast";

export const BagPage = () => {
  const currUser = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currPath = useLocation().pathname;

  useEffect(() => {
    if (currUser?.accountType === 'Buyer' && currUser.token) {
      getMyBag(dispatch, currUser.token)
    } else {
      return;
    }
  }, [])

  const userBag = useSelector(store => store.bag);

  const handleCreateOrder = (bag) => {

    return navigate('/bag/delivery-address');

  }

  const { totalPrice, totalSaving, totalItems } = calcTotal(userBag)
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 pt-20">

        <div className="max-w-4xl sm:max-w-7xl mx-auto">
          {userBag?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-xl">Your cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-y-10 justify-between">
              <Toaster />
              <div className="space-y-4 sm:w-[60%]">
                <Outlet />
              </div>

               {/* ------------PRICE DETAILS -------------------- */}
              <div className={`md:w-[38%] lg:w-[30%]  bg-white px-6 py-2   shadow-md flex flex-col justify-around ${currPath!=='/bag'?"h-[18rem]":"h-[25rem]"}`}>

                <div class="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                  <div class="flow-root">
                    <p className="text-lg mb-1 text-gray-400 font-semibold border-gray-200 border-b-2 pb-1">PRICE DETAILS</p>

                    <div class="">
                     {/* -----------SubTotal ----------- */}
                      <dl class="flex items-center justify-between gap-4 py-3">
                        <dt class="text-base  text-gray-600 font-[600] flex items-center gap-1">SubTotal
                          <span className="text-sm text-gray-500 font-[400]">
                            {"(" + totalItems + " items )"}
                          </span></dt>
                        <dd class="text-base font-medium text-gray-900 flex items-center">
                          <LiaRupeeSignSolid />
                          {totalPrice + totalSaving}</dd>
                      </dl>
                      {/* -----------Savings ----------- */}
                      <dl class="flex items-center justify-between gap-4 py-3">
                        <dt class="text-base  text-gray-600 font-[600] ">Savings</dt>
                        <dd class="text-base font-medium text-green-500 flex items-center">
                          <LiaRupeeSignSolid />
                          {totalSaving}</dd>
                      </dl>
                       {/* --------------Delivery charges -------------- */}
                      <dl class="flex items-center justify-between gap-4 py-3">
                        <dt class="text-base  text-gray-600 font-[600] ">Delivery charges</dt>
                        <dd class="text-base font-medium text-green-500 flex items-center gap-x-1">
                          <span className="line-through flex items-center">
                            <LiaRupeeSignSolid /> 200
                          </span>
                          <span>FREE</span></dd>
                      </dl>
                      {/* --------------Total Payable -------------- */}
                      <dl class="flex items-center justify-between gap-4 py-3">
                        <dt class="text-lg font-bold text-blue-600 ">Total Payable</dt>
                        <dd class="text-base font-bold text-gray-900 ">{new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                        }).format(totalPrice - totalSaving)}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

              {/*  ----------  Place order btn  ----------  */}
                {currPath === '/bag' &&
                  <div class="space-y-3 mt-0">
                    <button
                      onClick={() => handleCreateOrder(userBag)}

                      className="w-full bg-blue-600 text-white py-3 px-4  hover:bg-blue-600 transition-colors duration-300 font-semibold">
                      Proceed to Checkout
                    </button>

                    <p
                      class="text-sm font-normal text-gray-500 dark:text-gray-400">One or more items in your cart require an account. <a href="#" title="" class="font-medium text-primary-700  hover:underline dark:text-primary-500">Sign in or create an account now.</a>.
                    </p>
                  </div>
                }

              </div>

            </div>
          )}
        </div>
        
        {/* Modal for create address */}
        <CreateAddressModal />
      </div>

      <Footer />
    </>

  );
};

