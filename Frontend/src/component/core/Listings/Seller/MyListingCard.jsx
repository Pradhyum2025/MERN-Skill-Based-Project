import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingBtn from "../../../common/LoadingBtn";
import { deleteLisitng } from "../../../../operations/listing";

import { FaTrash } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";

export const MyListingCard = ({ listing, setListingDetails ,clickedActionId ,setClickedActionId }) => {

  const navigate = useNavigate();
  
  //Delete to cart Handler
  const handleDeleteListing = () => {
    setListingDetails({
      productName:listing.productName,
      _id:listing._id
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
            <p class="text-sm text-black ">{listing?.productName}</p>
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

        <div className={`${clickedActionId===listing._id?'block z-30 transition duration-1000 delay-1000 ease-in-out':'hidden'} absolute top-[-74px]  right-[-65px] w-[8.2rem] bg-slate-300  shadow-lg rounded-xl rounded-bl-[0px] py-2 mt-0 `}>

          <p 
          onClick={()=>navigate(`/dashbord/edit/${listing._id}`)}
          className="block px-4 py-2 text-md font-[600] text-gray-600 hover:bg-slate-200 flex items-center gap-2 border-b-[1px] border-gray-400 cursor-pointer">
            Update <MdOutlineEditNote className="text-2xl font-[900]"/>
          </p>
          <p
          onClick={handleDeleteListing}
           className="block px-4 py-2 text-md font-[600] text-gray-600 hover:bg-slate-200 flex items-center gap-2 cursor-pointer">
            Delete
            <FaTrash className="text-md font-[900]" />
          </p>
        </div>

        <button
        className="p-1 hover:bg-gray-200 rounded"
        onClick={()=>{
          if(clickedActionId===listing._id){
            return setClickedActionId(()=>-1);
          }else{
            return setClickedActionId(()=>listing._id);
          }
        }}
         title="Edit ">
          <BsThreeDotsVertical className={`${clickedActionId===listing._id?'text-lg font-bold text-black':'text-md font-bold text-gray-500 scale-105'}`} />
        </button>
      </td>
    </tr>
  )
};