import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { PaymentMethods } from '../Payment/PaymentModes';

export default function PaymentOptions() {

  const currUser = useSelector(store=>store.auth);
  
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
    
              <div className='text-gray-700 flex flex-col md:flex-row text-start md:items-center text-sm gap-x-5 pl-10'>
                <span>{currUser.contact}</span>
                <span>{currUser.email}</span>
              </div>
    
              </div>
    
    
              <button
                onClick={()=>document.getElementById('my_modal_3').showModal()}
                  className='px-1 py-2 w-[20%] md:w-[10%] text-center border border-blue-600 text-blue-600 hover:bg-gray-50 text-sm font-semibold'
                  >EDIT</button>
    
            </div>
          </div> 
    
          {/*  --------- Address ---------  */}
          <div className="flex  items-center justify-between  p-4 bg-white  shadow-md  transition-shadow duration-300 relative">
            <div className="flex flex-row gap-x-2 items-center justify-between w-full">
           
                   <div className='flex flex-row gap-x-2 items-center'>
                       <span class="bg-gray-100 text-blue-700 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm ">2</span>
                       <FaCheck className='text-blue-600 font-bold' />
                       <span className='text-gray-500 text-[1rem] font-bold'>DELIVERY ADDRESS</span>
                     </div>
           
                     <Link
                   className='px-1 py-2 w-[20%] sm:w-[10%] text-center border border-blue-600 text-blue-600 hover:bg-gray-50 text-sm font-semibold'
                      to={'/bag/delivery-address'}>EDIT</Link>
                     
                   </div>
          </div>
          {/*  --------- Order details ---------  */}
          <div className="flex  items-center justify-between  p-4 bg-white  shadow-md  transition-shadow duration-300 relative">
          <div className="flex flex-row gap-x-2 items-center justify-between w-full">
           
           <div className='flex flex-row gap-x-2 items-center'>
               <span class="bg-gray-100 text-blue-700 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm ">3</span>
               <FaCheck className='text-blue-600 font-bold' />
               <span className='text-gray-500 text-[1rem] font-bold'>ORDER SUMMARY</span>
             </div>
   
             <Link
           className='px-1 py-2 w-[20%] sm:w-[10%] text-center border border-blue-600 text-blue-600 hover:bg-gray-50 text-sm font-semibold'
              to={'/bag/order-summary'}>EDIT</Link>
             
           </div>
          </div>
          {/*  --------- Payment options ---------  */}
          <div
            className="flex  items-center justify-between  bg-white  shadow-md  transition-shadow duration-300 relative">
            <div className="flex flex-col gap-x-2 items-center w-full">
            <div className='flex flex-row gap-x-2 items-center  p-4 w-full bg-blue-600'>
                <span class="bg-gray-100 text-blue-700 text-sm  font-bold me-2 px-2.5 py-0.5 rounded-sm ">4</span>
                <FaCheck className='text-blue-600 font-bold' />
                <span className='text-white text-[1rem] font-bold'>PAYMENT OPTIONS</span>
              </div>
            
                <PaymentMethods/>
  
            </div>
          </div>
        </div>
  )
}
