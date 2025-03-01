import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa6";
import { getMyAddresses } from '../../../operations/Address';
import AdderessCart from './AdderessCart';
import { Link } from 'react-router-dom';
import LoadingBtn from '../../common/LoadingBtn';
LoadingBtn
export default function AddressStatus() {
  const dispatch = useDispatch();
  const currUser = useSelector(store => store.auth);

  useEffect(() => {
    if (currUser.token) {
      getMyAddresses(dispatch, currUser.token)
    }
  }, [])
  const myAddresses = useSelector(store => store.addresses);
  const fetching = useSelector(store => store.fetching);
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

          <div className='text-gray-700 flex flex-col md:flex-row text-start md:items-center text-sm gap-x-5 pl-10 '>
            <span>{currUser.contact}</span>
            <span>{currUser.email}</span>
          </div>

          </div>


          <Link
            className='px-1 py-2 w-[20%] md:w-[10%] text-center border border-blue-600 text-blue-600 hover:bg-gray-50 text-sm font-semibold'
            to={'/bag/login-status'}>EDIT</Link>

        </div>
      </div>

      {/*  --------- Address ---------  */}
      <div className="flex  items-center justify-between   bg-white  shadow-md  transition-shadow duration-300 relative">
        <div className="flex flex-col gap-x-2 items-center w-full ">

          <div className='flex flex-row gap-x-2 items-center p-4 w-full bg-blue-600'>
            <span class="bg-gray-100 text-blue-700 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm ">2</span>

            <span className='text-white text-[1rem] font-bold'>DELIVERY ADDRESS</span>
          </div>

          <div className={`w-full ${fetching ? 'relative opacity-75 ' : 'block'}`}>
            {/* Loader */}
            <div className={`${fetching ? 'absolute flex items-center justify-center h-full w-full ' : 'hidden'}`}>

             <button
             disabled={fetching}
             className='class="px-4 py-3 w-[30%] border border-gray-300 flex  gap-2 items-center justify-center bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold disabled:cursor-not-allowed z-20 ">'
             >
              <div role="status">
                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>

                <span class="sr-only">Loading...</span>

              </div> 
              <span className='text-xl font-bold'>
              Loading

              </span>

             </button>


            </div>

            {myAddresses && myAddresses.map(address => {
              return <AdderessCart key={address._id} address={address} />
            })}

            <div className='bg-gray-100 h-[3px] shadow-0'></div>

            <div className='w-full flex items-center justify-end p-2'>
              <button 
              onClick={() => document.getElementById('my_modal_1').showModal()}
              className='px-4 py-2 w-[2 5%] border-2 border-dashed border-blue-500  flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold text-md'>
               NEW ADDRESS
              </button>
            </div>

          </div>
        </div>
      </div>
      {/*  --------- Order details ---------  */}
      <div className="flex  items-center justify-between  p-4 bg-white  shadow-md  transition-shadow duration-300 relative">
        <div className="flex flex-row gap-x-2 items-center ">
          <div className='flex flex-row gap-x-2 items-center'>
            <span class="bg-gray-100 text-blue-700 text-sm font-bold me-2 px-2.5 py-0.5 rounded-sm ">3</span>
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
            <span className='text-gray-500 text-[1rem] font-bold'>PAYMENT OPTIONS</span>
          </div>
        </div>
      </div>
    </div>
  )
}