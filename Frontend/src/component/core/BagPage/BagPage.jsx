import React, { useEffect, useState } from "react";
import { BagCard } from "./BagCard";
import { useDispatch, useSelector } from 'react-redux';
import { calcTotal, getMyBag } from "../../../operations/bag";

export const BagPage = () => {
  const currUser = useSelector(store=>store.auth)
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(currUser?.accountType==='Buyer'&& currUser.token){
      getMyBag(dispatch,currUser.token)
    }else{
      return;
    }
  },[])
  
  const userBag = useSelector(store=>store.bag);

  return (

    <div className="w-full min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 pt-10">

      <div className="max-w-4xl mx-auto">
        <h1 className="w-full text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">Shopping Cart</h1>
        {userBag?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">Your cart is empty</p>
          </div>
        ) : (
          <div>
            <div className="space-y-4">
              {userBag?.map((course) => (
                <BagCard key={course._id} course={course} />
              ))}
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md flex justify-around">
              <div className="flex gap-x-5 items-center mb-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold">{new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }).format(calcTotal(userBag))}</span>
              </div>
              <button 
              disabled={true}
              className="w-[30%] bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-300 font-semibold">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

