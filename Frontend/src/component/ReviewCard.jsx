import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { GoStarFill } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ReviewCard = ({ currReview,listingId}) => {
  
  // const [shortened, setShortened] = useState('');
  // setShortened(currReview.author.username.substring(0, 1));

  // handle review delete
  let currUser = JSON.parse(localStorage.getItem('currUser'))
  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  const handleDeleteReview = async(reviewId)=>{
     
    let response = await axios.delete(`http://localhost:8080/listing/review/${listingId}/${reviewId}`,{
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`, // Include token as a Bearer token
      },
    })
    if(response.data.success){
      toast.success(response.data.message)
      navigate(0);
    }else{
      toast.error('Review didnt delete!');
    }

  }


  const itrate = [1,2,3,4,5];
  return (
    <div className="md:w-[90%] h-[60%] relative w-full bg-slate-200  shadow-md rounded-lg md:p-4 p-4">
      {/* Author Info */}



     {(currUser && currUser._id===(currReview.author._id))?
      <button className="absolute top-[.5rem] right-3 z-1 text-red">
        <MdDelete 
        onClick={()=>handleDeleteReview(currReview._id)}
        className="text-[2.2rem] text-[red] p-[5px] 
      bg-slate-400 hover:bg-slate-500 rounded-[50%]"/>
      </button>:""
     }

      
      <div className="mb-4 flex items-center">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex justify-center items-center font-bold text-gray-500">
          {currReview.author?"User": "?"}
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-bold text-black">{currReview.author?currReview.author.username :"Anonymous"}</h4>
          <p className="text-sm text-gray-500">
            {new Date(currReview.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Comment */}
      <p className="font-semibold text-[1.1rem] text-gray-600 mb-2">{currReview.comment || "No comment provided."}</p>

      {/* Rating */}
      <div className="flex items-center">
      <span className="font-bold text-[1.3rem] text-slate-600">{currReview.rating+'.0'}</span>&nbsp;
        {itrate.map((count)=>{
          return <GoStarFill key={count} className={`${count<=currReview.rating?'text-yellow-400':''} text-[1.5rem]`}/>
        })}
      </div>
    </div>
  );
};

export default ReviewCard;

