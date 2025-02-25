import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { GoStarFill } from "react-icons/go";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postReview } from '../../../operations/review';
import LoadingBtn from '../../common/LoadingBtn';


export default function PostReview({orderId,listingId }) {

  let currUser = useSelector(store=>store.auth);
  const [rating, setRating] = useState(1);
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors } 
  } = useForm();
  
  const handleRating = (value) => {
    setRating(value);
  };

  //handle submit
  const onSubmit = async (data) => {
    const reviewData = {
      comment: data.comment,
      rating: rating
    }
    if (currUser.token && currUser.accountType==='Buyer'){
      return await postReview(dispatch,orderId,listingId,currUser.token,reviewData)
    }else{
     return; 
    }
  }
  const fetching = useSelector(store=>store.fetching);
  return (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-gray-100 px-8 py-5 rounded-lg " >

          <h2 className="text-xl font-bold mb-6 text-center text-gray-600">
            Rate & Review
          </h2>
         
         {/* Comment */}
          <div className="mb-4">
            <label htmlFor="comment" className="block text-md  font-semibold text-gray-700">Comment</label>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              className={`mt-1 block w-full text-[1.05rem] font-[400]  text-[black] ring-blue-400 ring-2 outline-0  p-2 border bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              {...register("comment", { required: true })}
            />
            {errors.comment && <span className='text-sm font-semibold text-red-500'>comment  is required*</span>}
          </div>
         
         {/* Rating */}
          <div className="flex items-center space-x-1 mt-6 mb-8">
            {Array.from({ length: 5 }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleRating(index + 1)}
                className={`text-2xl ${index < rating ? "text-yellow-400" : "text-gray-300"
                  } focus:outline-none`}
              >
                <GoStarFill />
              </button>
            ))}
          </div>

          <button
          disabled={fetching}
           type="submit"
           className="font-bold bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            {fetching?
            <LoadingBtn working={'Submiting'}/>:"Submit Review"}
            
          </button>
        </form>
  );
};

