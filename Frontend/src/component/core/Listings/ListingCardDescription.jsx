import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ListingCardDescription({listing}) {

  const navigate = useNavigate();

  // handle show items
  const handleGetItem = (curListing) => {
  navigate(`/show/${curListing._id}`);
  
  }

  return (
    <>
    {/* nameWithModel */}
      <h2
        onClick={() => handleGetItem(listing)}
        className="card-title text-black font-bold hover:underline hover:text-blue-600 hover:cursor-pointer">
        {listing.nameWithModel}
      </h2>

     {/* price of model */}
      <p className='text-black text-md font-bold'>{new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(listing.price)}
      </p>
      
    </>
  )
}
