import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import {  useNavigate } from 'react-router-dom';
import { AiFillStar } from "react-icons/ai";
import BagBtns from '../../BagPage/BagBtns';

export default function ListingCard({ listing, myBag }) {
  const navigate = useNavigate();

  const handleClickToView = (listingId) => {
    return navigate(`/show/${listingId}`)
  }
  const priceAfterDiscount = Math.floor(listing.price - (listing.price * (listing.discount) / 100))

  return (
    <div class="bg-white px-2 pt-2 pb-4 shadow-lg w-full">
      {/*  ------ Product Image ------   */}
      <div
        onClick={() => handleClickToView(listing._id)}
        class="w-full cursor-pointer relative">
        <img class="mx-auto h-full w-full aspect-[5/4] " src={listing?.images[0]} alt="" />
        {/*  ----------- Descount and Wishlist -----------  */}

        {/*  ------- Discount ------- */}
        <span class="me-2 rounded bg-blue-500 px-2.5 py-0.5 text-xs font-medium text-white   pt-[4px] absolute bottom-[.3rem] left-[.2rem]">
          Up to {listing?.discount}% off
        </span>

        {/*  -------Heart icons ------- */}

        <button type="button" data-tooltip-target="tooltip-add-to-favorites" class="rounded-lg p-2 text-white  hover:bg-gray-100 hover:text-gray-900  absolute top-[.3rem] right-[.2rem]">
          <span class="sr-only"> Add to Favorites </span>
          <FaRegHeart />
        </button>

      </div>

      <div class="pt-3">
        {/* ---------  Product name ---------  */}
        <div className='h-[2.8rem]'>
          <p
            onClick={() => handleClickToView(listing._id)}
            href="#" class="text-lg font-semibold leading-tight text-blue-600 hover:underline cursor-pointer">{listing?.productName.length > 50 ? listing?.productName.substring(0, 50) + '...' : listing?.productName}</p>
        </div>

        {/* ----------  Ratings  ---------- */}
        <div class="mt-2 flex items-center gap-2">
          <div class="flex items-center">
            <AiFillStar className='text-yellow-600 text-lg' />
            <AiFillStar className='text-yellow-600 text-lg' />
            <AiFillStar className='text-yellow-600 text-lg' />
            <AiFillStar className='text-yellow-600 text-lg' />
            <AiFillStar className='text-gray-400 text-lg' />
          </div>

          <p class="text-sm font-medium text-gray-900 dark:text-white">5.0</p>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">(455)</p>
        </div>


        <div class="mt-2 flex items-center justify-between gap-4">
          {/* Price */}
          <div className='flex flex-col gap-1'>
          <p class="text-sm font-medium leading-tight text-gray-400 flex items-center line-through">{new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
          }).format(listing.price)}</p>
          
          <p class="text-lg font-extrabold leading-tight text-gray-900 flex items-center">{new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
          }).format(priceAfterDiscount)}</p>
          </div>

          {/*  --------Bag buttons -------- */}

          <BagBtns listing={listing} myBag={myBag} quantity={1} />

        </div>
      </div>
    </div>
  )
}
