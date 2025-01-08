import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListingCard from './ListingCard'
import { useDispatch, useSelector} from 'react-redux'
import { listinSlicegAction } from '../store/listings'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { bagSliceAction } from '../store/Bag'

export default function Listing() {

  localStorage.removeItem('product');
  const dispatch = useDispatch();
  
  //fetch listing
  useEffect(()=>{
    let fetchListng = async()=>{
      let response =await axios.get('http://localhost:8080/listing')
      if(response.data){
        dispatch(listinSlicegAction.getListings(response.data.data));
      }
    }
    fetchListng();
  },[])
   
  const listings = useSelector(store => store.listings)
  // bag.indexOf(listing._id) !== -1
  // currUser && currUser.bag.indexOf(listing._id) !== -1

  return (
    <div className='flex justify-center bg-slate-400 items-center flex-wrap gap-5 md:gap-10 py-5 px-2 '>
      <Toaster/>
      {listings.map(listing =>{
        return <ListingCard key={listing._id} listing={listing}/>
        }
      )}
    </div>
  )
}
