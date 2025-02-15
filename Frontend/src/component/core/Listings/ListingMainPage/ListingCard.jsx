import React from 'react'
import { FaAward, FaRegHeart } from "react-icons/fa";
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";
import BagBtns from '../../BagPage/BagBtns';

export default function ListingCard({listing,myBag}) {
  const navigate = useNavigate();

  const handleClickToView = (listingId)=>{
    return navigate(`/show/${listingId}`)
  }
  return (
     <div class="rounded-lg border border-gray-200 bg-white px-2 pt-2 pb-4 shadow-sm w-full sm:w-[19rem] md:w-[21rem] lg:w-[20rem] xl:w-[19rem] 2xl:w-[21rem]">
            {/*  ------ Product Image ------   */}
            <div
            onClick={()=>handleClickToView(listing._id)}
             class="h-[200px] xl:h-[220px] w-full cursor-pointer">
                <img class="mx-auto h-full w-full object-contains rounded-tr-md rounded-tl-md" src={listing?.images[0]} alt="" />
            </div>
    
            <div class="pt-4">
    
            {/*  ----------- Descount and Wishlist -----------  */}
              <div class="mb-2 flex items-center justify-between gap-4">
                {/*  ------- Discount ------- */}
                <span class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-primary-500  pt-[4px]">
                   Up to {listing?.discount}% off
                    </span>
    
               {/*  -------Heart icons ------- */}
    
                  <button type="button" data-tooltip-target="tooltip-add-to-favorites" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only"> Add to Favorites </span>
                    <FaRegHeart/>
                  </button>
    
              </div>
           
           {/* ---------  Product name ---------  */}
           <div className='h-[2.8rem]'>
              <p
               onClick={()=>handleClickToView(listing._id)}
               href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline cursor-pointer">{listing?.productName.length>50?listing?.productName.substring(0,50)+'...':listing?.productName}</p>
           </div>
               
               {/* ----------  Ratings  ---------- */}
              <div class="mt-2 flex items-center gap-2">
                <div class="flex items-center">
                 <AiFillStar className='text-yellow-600 text-lg'/>
                 <AiFillStar className='text-yellow-600 text-lg'/>
                 <AiFillStar className='text-yellow-600 text-lg'/>
                 <AiFillStar className='text-yellow-600 text-lg'/>
                 <AiFillStar className='text-gray-400 text-lg'/>
                </div>
    
                <p class="text-sm font-medium text-gray-900 dark:text-white">5.0</p>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">(455)</p>
              </div>
            
            {/* Award and bset price */}
              <ul class="mt-2 flex items-center gap-4">
                <li class="flex items-center gap-2">
                 <FaAward className='text-gray-400'/>
                  <p class="text-sm font-medium text-gray-500 ">Fast Delivery</p>
                </li>
    
                <li class="flex items-center gap-2">
                  <svg class="h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                  </svg>
                  <p class="text-sm font-medium text-gray-500">Best Price</p>
                </li>
              </ul>
    
              <div class="mt-4 flex items-center justify-between gap-4">
                {/* Price */}
                <p class="text-2xl font-extrabold leading-tight text-gray-900 flex items-center"><FaIndianRupeeSign/>1,699</p>
    
                {/*  --------Bag buttons -------- */}
                
                <BagBtns listing={listing}   myBag={myBag} quantity={1}/>

              </div>
            </div>
      </div>
  )
}
