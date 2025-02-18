import React from 'react'
import { useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa6";
import BagCardSection from '../BagPage/BagCardSection';
import { Link, useNavigate } from 'react-router-dom';


export default function OrderSummary() {

  const currUser = useSelector(store => store.auth);
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    return navigate('/bag/payment-options')
  }
  return (
    <div className="flex flex-col gap-y-2">
      {/*  --------- Login status ---------  */}
      <div className="flex  items-center justify-between  p-4 bg-white  shadow-md  transition-shadow duration-300 relative">
       <div className="flex gap-2 items-center justify-between w-full ">
      
                <div className='flex flex-col gap-2 items-start '>
                <div className='flex flex-row gap-x-2 items-center'>
                  <span class="bg-gray-100 text-blue-700 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm ">1</span>
                  <FaCheck className='text-blue-600 font-bold' />
                  <span className='text-gray-500 text-[1rem] font-bold'>LOGIN</span>
                </div>
      
                <div className='text-gray-700 flex items-center text-sm gap-5 pl-10'>
                  <span>{currUser.contact}</span>
                  <span>{currUser.email}</span>
                </div>
      
                </div>
      
      
                <Link
                  className='px-1 py-2 w-[10%] text-center border border-blue-600 text-blue-600 hover:bg-gray-50 text-sm font-semibold'
                  to={'/bag/login-status'}>EDIT</Link>
      
              </div>
      </div>

      {/*  --------- Address ---------  */}
      <div className="flex  items-center justify-between p-4  bg-white  shadow-md  transition-shadow duration-300 relative">
        <div className="flex flex-row gap-x-2 items-center justify-between w-full">

        <div className='flex flex-row gap-x-2 items-center'>
            <span class="bg-gray-100 text-blue-700 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm ">2</span>
            <FaCheck className='text-blue-600 font-bold' />
            <span className='text-gray-500 text-[1rem] font-bold'>DELIVERY ADDRESS</span>
          </div>

          <Link
        className='px-1 py-2 w-[10%] text-center border border-blue-600 text-blue-600 hover:bg-gray-50 text-sm font-semibold'
           to={'/bag/delivery-address'}>EDIT</Link>
          
        </div>
      </div>
      {/*  --------- Order details ---------  */}
      <div className="flex  items-center justify-between   bg-white  shadow-md  transition-shadow duration-300 relative">
        <div className="flex flex-col gap-x-2 items-center  w-full">

          <div className='flex flex-row gap-x-2 items-center p-4 w-full bg-blue-600'>
            <span class="bg-gray-100 text-blue-700 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm ">3</span>
            <span className='text-white text-[1rem] font-bold'>ORDER SUMMARY</span>
          </div>

          <div className='w-full'> 
          <BagCardSection/>
          </div>


          <div className='w-full flex items-center justify-start p-2'>
          <button
            onClick={handleNavigate}
            className='px-4 py-3 w-[30%] border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold'>
            CONTINUE
          </button>
            </div>
        </div>
      </div>
      {/*  --------- Payment options ---------  */}
      <div
        className="flex  items-center justify-between  p-4 bg-white  shadow-md  transition-shadow duration-300 relative">
        <div className="flex flex-row gap-x-2 items-center">
          <div className='flex flex-row gap-x-2 items-center'>
            <span class="bg-gray-100 text-blue-700 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm ">4</span>
            <span className='text-gray-500 text-[1rem] font-bold'>PAYMENT OPTIONS</span>
          </div>
        </div>
      </div>
    </div>
  )
}
