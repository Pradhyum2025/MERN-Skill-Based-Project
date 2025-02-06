import { FaTrash } from "react-icons/fa";
import { removeToBag } from "../../../operations/bag";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import LoadingBtn from "../../common/LoadingBtn";
import {  useNavigate } from "react-router-dom";
// import BuyNowBtn  from '../payment/BuyNowBtn'

export const BagCard = ({ course }) => {
  const currUser = useSelector(store=>store.auth);
  const [fetching,setFetching] = useState(false);
  const dispatch =useDispatch();
  const navigate = useNavigate();

  //Add to cart Handler
  const handleRemoveToBag = (courseId)=>{
    if(currUser.token){
      removeToBag(dispatch,courseId,currUser.token,setFetching);
    }else{
      return;
    }
  }

  const handleNavigatation = (courseId)=>{
    return navigate(`/show/${courseId}`,{state:{returnPath:`/dashbord/cart`}})
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
       
    
        <img
        onClick={()=>handleNavigatation(course._id)}
          src={course?.thumbnail}
          alt={course?.courseName}
          className="w-24 h-24 object-cover rounded-lg mb-4 md:mb-0 md:mr-6 cursor-pointer"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
          }}
        />


        <div className="text-center md:text-left">
         
          <h3
           onClick={()=>handleNavigatation(course._id)}
           className="text-lg font-semibold text-indigo-600 hover:underline cursor-pointer">{course?.courseName}</h3>

          <p className="text-gray-600">{new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
          }).format(course?.price)}</p>
        </div>

      </div>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 gap-x-5 md:space-x-6">
        <button
          onClick={() => handleRemoveToBag(course?._id)}
          className="p-2 flex text-red-500 hover:text-red-700 transition-colors"
        >
          {fetching?
          <LoadingBtn working={''}/>:
          <FaTrash size={20} />
          }
        </button>
        <BuyNowBtn course={course}/>

      </div>
    </div>
  )
};