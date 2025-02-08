import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { MyListingCard } from "./MyListingCard";
import { getMyListings } from "../../../../operations/listing";

export const MyListing = () => {
  const currUser = useSelector(store=>store.auth)
  const dispatch = useDispatch();

  useEffect(()=>{
    if(currUser?.accountType==='Seller'&& currUser.token){
      getMyListings(dispatch,currUser.token)
    }else{
      return;
    }
  },[])
  
  const myListings = useSelector(store=>store.listings);

  
  return (

    <div className="w-full min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 pt-10">

      <div className="max-w-4xl mx-auto">
        <h1 className="w-full text-3xl font-bold text-gray-900 mb-8 text-center md:text-left">Your Listing Deatils</h1>
        {myListings?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">Your Listing is empty</p>
          </div>
        ) : (
          <div>
            <div className="space-y-4">
              {myListings?.map((listing) => (
                <MyListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

