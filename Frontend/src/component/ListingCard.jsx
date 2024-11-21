import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { getItemSliceAction } from '../store/getItem';
import toast from "react-hot-toast";
import axios from 'axios'
import { bagSliceAction } from '../store/Bag';
import { authSliceAction } from '../store/auth';


export default function ListingCard({listing}) {


  let currUser = useSelector(store=>store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle show items
 const handleGetItem =(curListing)=>{
   navigate(`/show/${curListing._id}`);
  }

  let token = localStorage.getItem('token');

  // handle add to card
  const handleAddCard = async(product_id)=>{
    let currUser = localStorage.getItem('currUser');
    if(currUser){
      let response = await axios.get(`http://localhost:8080/user/bag/${product_id}`,{
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}` // Include token as a Bearer token
        }});
        
        if(response.data){
          localStorage.setItem('currUser',JSON.stringify(response.data.currUser));
          dispatch(authSliceAction.initializeAuther(response.data.currUser));
        }
        if(response.data.success){
        dispatch(bagSliceAction.addToBag());
        toast.success(response.data.message,{
          duration: 1000,
        });
      }else{
        toast.error(response.data.message,{
          duration: 1000,
        });
      }
    }else{
      document.getElementById('my_modal_3').showModal()
      toast.error("For add to card! Login please",{
        position: 'bottom-right',
      });
    }
  }

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
        duration: 1000,
      });
    }else{
      toast.error(response.data.message,{
        duration: 1000,
      });
    }
  }



  return (
    <div className="card card-compact bg-zinc-200 w-[25rem] lg:h-[25rem] lg:w-[21rem] shadow-xl">
  <figure>
    <img 
    className='h-[17rem] w-full'
      src={listing.image}
      alt="Shoes" />
  </figure>
  <div className="card-body">
  

   <h2 
   onClick={()=>handleGetItem(listing)}
   className="card-title text-black font-bold hover:underline hover:text-blue-600 hover:cursor-pointer">
    {listing.nameWithModel} </h2>


    <p className='text-black text-md font-bold'>{new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
}).format(listing.price)}</p>
    <div className="card-actions justify-between">
      {
        (currUser && currUser.bag.indexOf(listing._id) !== -1)?
        <button 
        className="btn  btn-ghost text-base font-bold bg-blue-600 border-none hover:bg-blue-600 w-full border-[#ecba3d] text-[rgb(0,0,0)]"
        onClick={()=>handleRemoveCard(listing._id)}
        >
        Remove to bag
        </button>:
        <button 
        className="btn  btn-ghost text-base font-bold bg-[#ecba3d] border-none hover:bg-[#ecba3d] w-full border-[#ecba3d] text-[rgb(0,0,0)]"
        onClick={()=>handleAddCard(listing._id)}
        >
        Add to bag
        </button>
      }

      {/* <button className="btn  btn-ghost bg-[#ecba3d] hover:bg-[#d1a432f7] border-[#ecba3d] text-[rgb(0,0,0)]">Buy Now</button> */}
    </div>
  </div>
</div>
  )
}
