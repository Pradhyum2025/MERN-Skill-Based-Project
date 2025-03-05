import React, { useEffect, useState } from 'react'
import ListingCard from './ListingCard'
import { useDispatch, useSelector } from 'react-redux'
import { getFilteredListing } from '../../../../operations/listing';
import {  useParams } from 'react-router-dom';
import ListingSkeletonCard from './ListingSkeletonCard';
import { getMyBag } from '../../../../operations/bag';


export default function ListingContainer() {
  const dispatch = useDispatch();
  const [newFetching,setNewFetching] = useState(false)
  const { categoryId } = useParams();
  const currUser = useSelector(store=>store.auth);

  useEffect(() => {
    if (categoryId) {
      getFilteredListing(dispatch, categoryId,setNewFetching);
    }
    if (currUser.token && currUser.accountType==='Buyer') {
      getMyBag(dispatch,currUser.token,setNewFetching);
    }
  }, [])
  

  const filteredListing = useSelector(store => store.listings);
  const myBag = useSelector(store=>store.bag);


  return (
    <>
      {(filteredListing.length === 0) ?
       <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 justify-items-center 2xl:px-10">
       {/*  ------ Product Cart ------   */}
       {[1,2,3,4].map(num => {
         return <ListingSkeletonCard/>
       })}

     </div>
        :
        <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 justify-items-center 2xl:px-10">
          {/*  ------ Product Cart ------   */}
          {filteredListing.map(listing => {
            return <ListingCard listing={listing} myBag={myBag} />
          })}

        </div>
      }
    </>
  )
}
