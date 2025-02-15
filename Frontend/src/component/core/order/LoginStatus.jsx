import React from 'react'
import { useSelector } from 'react-redux';
import { IoMdCheckmark } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
export default function LoginStatus() {

  const currUser = useSelector(store => store.auth);

  return (
    <div className="flex flex-col gap-y-2">
      {/*  --------- Login status ---------  */}
      <div className="flex  items-center justify-between  p-4 bg-white  shadow-md  transition-shadow duration-300 relative">
        <div className="flex flex-col gap-2 items-start ">

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
      </div>

      {/*  --------- Address ---------  */}
      <div className="flex  items-center justify-between   bg-white  shadow-md  transition-shadow duration-300 relative">
        <div className="flex flex-col gap-x-2 items-center w-full ">

          <div className='flex flex-row gap-x-2 items-center p-4 w-full bg-blue-600'>
            <span class="bg-gray-100 text-blue-700 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm ">2</span>
          
            <span className='text-white text-[1rem] font-bold'>DELIVERY ADDRESS</span>
          </div>
          <div>
            ALl
          </div>
        </div>
      </div>
      {/*  --------- Order details ---------  */}
      <div className="flex  items-center justify-between  p-4 bg-white  shadow-md  transition-shadow duration-300 relative">
        <div className="flex flex-row gap-x-2 items-center ">
          <div className='flex flex-row gap-x-2 items-center'>
            <span class="bg-gray-100 text-blue-700 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm ">3</span>
            <FaCheck className='text-blue-600 font-bold' />
            <span className='text-gray-500 text-[1rem] font-bold'>ORDER SUMMARY</span>
          </div>
        </div>
      </div>
      {/*  --------- Payment options ---------  */}
      <div
        className="flex  items-center justify-between  p-4 bg-white  shadow-md  transition-shadow duration-300 relative">
        <div className="flex flex-row gap-x-2 items-center">
          <div className='flex flex-row gap-x-2 items-center'>
            <span class="bg-gray-100 text-blue-700 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm ">4</span>
            <FaCheck className='text-blue-600 font-bold' />
            <span className='text-gray-500 text-[1rem] font-bold'>PAYMENT OPTIONS</span>
          </div>
        </div>
      </div>
    </div>
  )
}
