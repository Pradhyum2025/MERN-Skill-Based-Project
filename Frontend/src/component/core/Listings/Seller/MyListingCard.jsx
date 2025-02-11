import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingBtn from "../../../common/LoadingBtn";
import { deleteLisitng } from "../../../../operations/listing";

import { FaTrash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";

export const MyListingCard = ({ listing, setListingDetails }) => {

  const navigate = useNavigate();

  //Delete to cart Handler
  const handleDeleteListing = () => {
    setListingDetails({
      productName: listing.productName,
      _id: listing._id
    })
    return document.getElementById('my_modal_3').showModal();
  }


  const handleGetListingDetails = (listingId) => {
    return navigate(`/dashbord/show/${listingId}`, { state: { returnPath: '/dashbord' } });
  }


  return (
    <tr>
      <td class="pl-4 w-8">
        <input id="checkbox1" type="checkbox" class="hidden peer" />
        <label for="checkbox1"
          class="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-4 h-4 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-full fill-white" viewBox="0 0 520 520">
            <path
              d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
              data-name="7-Check" data-original="#000000" />
          </svg>
        </label>
      </td>

      {/* Preview image */}
      <td class="p-4 text-sm">
        <div
          onClick={() => handleGetListingDetails(listing?._id)}
          class="flex items-center cursor-pointer">
          <img src={listing?.images[0]} class="w-10 h-10  rounded shrink-0 bg-gray-100" />
          <div class="mx-4">
            <p class="text-sm text-black ">{listing?.productName.length>20?
            listing?.productName.substring(0,20)+"..." :
            listing?.productName}</p>
          </div>
        </div>
      </td>

      {/* Price */}
      <td class="p-4 text-sm">
        Rs. {listing?.price}.00
      </td>

      {/* in stock */}
      <td class="p-4 text-sm">
        {listing?.stock}
      </td>

      {/* Sold out */}
      <td class="p-4 text-sm">
        200
      </td>

      {/* Ratings */}
      <td class="p-4 text-sm">
        <svg class="w-4 h-4 inline mr-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
            fill="#facc15" />
        </svg>
        <svg class="w-4 h-4 inline mr-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
            fill="#facc15" />
        </svg>
        <svg class="w-4 h-4 inline mr-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
            fill="#facc15" />
        </svg>
        <svg class="w-4 h-4 inline mr-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
            fill="#CED5D8" />
        </svg>
        <svg class="w-4 h-4 inline" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
            fill="#CED5D8" />
        </svg>
      </td>

      {/* Action btns */}
      <td class="p-4 text-sm relative">

        <button
          onClick={() => navigate(`/dashbord/edit/${listing._id}`)}
          class="mr-4"
          title="Edit">

          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-blue-500 hover:fill-blue-700"
            viewBox="0 0 348.882 348.882">
            <path
              d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
              data-original="#000000" />
            <path
              d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
              data-original="#000000" />
          </svg>
        </button>

        <button
          onClick={handleDeleteListing}
          title="Delete">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
            <path
              d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
              data-original="#000000" />
            <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
              data-original="#000000" />
          </svg>
        </button>

      </td>
    </tr>
  )
};