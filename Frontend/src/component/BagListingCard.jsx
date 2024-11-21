import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getItemSliceAction } from '../store/getItem';
import { ImCross } from "react-icons/im";
import { authSliceAction } from '../store/auth';
import { bagSliceAction } from '../store/Bag';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function BagListingCard({item}) {
   const dispatch =useDispatch();
   const navigate =useNavigate();

    // handle show items
    const handleGetItem =(curListing)=>{
      navigate(`/show/${curListing._id}`)
     }

  let token = localStorage.getItem('token');

  //handle remove to bag
  const handleRemoveCard = async(product_id)=>{
    
    let response = await axios.delete(`http://localhost:8080/user/bag/${product_id}`,{
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}` // Include token as a Bearer token
      }});
      
      if(response.data){
        localStorage.setItem('currUser',JSON.stringify(response.data.currUser));
        dispatch(authSliceAction.initializeAuther(response.data.currUser));
      }
      if(response.data.success){  
      dispatch(bagSliceAction.removeToBag());
      toast.success(response.data.message,{
        duration: 300,
      });
      setTimeout(()=>{
        navigate(0);
      },300)
    }else{
      toast.error(response.data.message,{
        duration: 1000,
      });
    }
  }

  return (
    <div
    className="flex items-center justify-between border-b pb-4 mb-4"
  >
    <img
    onClick={()=>handleGetItem(item)}

      src={item.image}
      alt={item.nameWithModel}
      className="w-20 h-20 object-cover rounded-lg hover:cursor-pointer"
    />
    <div className="flex-1 px-4">
      <h3 className="font-bold text-black">{item.nameWithModel}</h3>
      <p className="text-gray-500">Rs.{item.price.toFixed(2)}</p>
    </div>
    <div className="flex items-center space-x-2">
      <button
        className="bg-gray-200 text-gray-600 px-2 rounded-md"
      >
        -
      </button>
      <span className="font-medium">{item.quantity}</span>
      <button
        className="bg-gray-200 text-gray-600 px-2 rounded-md"
      >
        +
      </button>
    </div>
    <div 
    className='flex items-start justify-end h-[100px] w-[50px] p-0 m-0 '>
      <ImCross 
      onClick={()=>handleRemoveCard(item._id)}
      className='text-[2rem] text-[red] font-[300] cursor-pointer hover:bg-slate-200 p-2 rounded-[50%]'/> </div>
  </div>
  )
}
