import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import './PostReview.css'
import { GoStarFill } from "react-icons/go";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function PostReview({listing_id}) {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [rating, setRating] = useState(0);
  
  const handleRating = (value) => {
    setRating(value);
  };
  const navigate = useNavigate();

  //handle submit
  let token = localStorage.getItem('token');
  let currUser =localStorage.getItem('currUser');
  const onSubmit = async(data) =>{
    if(currUser){

      let review ={
        comment:data.comment,
        rating:rating==0?1:rating
      }
  
      let response = await axios.post(`http://localhost:8080/listing/review/${listing_id}`,review,{
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`, // Include token as a Bearer token
        },
      })
      if(response.data.success){
        toast.success(response.data.message)
        navigate(0);
      }else{
        toast.error('Review has not posted!');
      }
    }else{
      document.getElementById('my_modal_3').showModal()
      toast.error("For give to review! Login please",{
        position: 'bottom-right',
      });
    }

    }
  
  return (
    <form onSubmit={handleSubmit(onSubmit) } className="md:w-[40%] max-h-[22rem]  my-10 bg-white p-8 rounded-lg shadow-lg" >
       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Submit a Review
      </h2>
      <div  className="mb-4">
        <label htmlFor="comment"  className="block text-sm  font-medium text-gray-700">Comment:</label>
        <textarea
          id="comment"
          name="comment"
          className={`mt-1 block w-full text-[1.05rem] font-[400]  text-[black] p-2 border bg-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          {...register("comment", { required: true })}
        />
     {errors.comment && <span className='text-sm font-semibold text-red-500'>comment  is required*</span>}
      </div>

      <div className="flex items-center space-x-1 mt-6 mb-10">
      {Array.from({ length: 5 }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleRating(index + 1)}
          className={`text-2xl ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          } focus:outline-none`}
        >
          <GoStarFill/>
        </button>
      ))}
    </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
     >Submit Review</button>
    </form>
  );
};

