import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import LoadingBtn from "../../../common/LoadingBtn";
import {  useNavigate } from "react-router-dom";
import { deleteLisitng } from "../../../../operations/listing";
import { PiEye } from "react-icons/pi";
export const MyListingCard = ({ listing }) => {

  const currUser = useSelector(store=>store.auth);
  const [fetching,setFetching] = useState(false);
  const dispatch =useDispatch();
  const navigate = useNavigate();
  
  //Add to cart Handler
  const handleDeleteListing = (listingId)=>{
    if(currUser.token && currUser?.accountType=='Seller'){
      return deleteLisitng(dispatch, currUser.token, listingId,setFetching);
    }else{
      return document.getElementById('my_modal_3').showModal();
    }
  }

  const handleNavigatation = (courseId)=>{
    return navigate(`/show/${courseId}`,{state:{returnPath:`/dashbord/cart`}})
  }

  const handleGetListingDetails = (listingId)=>{
    return navigate(`/dashbord/show/${listingId}`);
  }
  
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">

        <div className="flex flex-col justify-between items-start h-full gap-y-5 ">
          <h3
           onClick={()=>handleNavigatation(listing._id)}
           className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer">{listing?.productName}
           </h3>
        </div>

      </div>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 gap-x-5 md:space-x-6">
        <button
        onClick={()=>handleGetListingDetails(listing._id)} >
          <PiEye />
        </button>
        <button
          onClick={()=>handleDeleteListing(listing._id)}
          className="p-2 flex text-red-500 hover:text-red-700 transition-colors"
        >
          {fetching?
          <LoadingBtn working={''}/>:
          <FaTrash size={20} />
          }
        </button>
      </div>
    </div>
  )
};