import React, { useEffect, useState } from 'react'
import ListingCard from '../ListingMainPage/ListingCard'
import ListingSkeletonCard from '../ListingMainPage/ListingSkeletonCard'
import { getSearchingList } from '../../../../operations/search'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getMyBag } from '../../../../operations/bag'

export default function SearchResult() {
  const dispatch = useDispatch();
  const [newFetching,setNewFetching] = useState(false)
  const currUser = useSelector(store=>store.auth)
  const {listingId } = useLocation().state;

 
  useEffect(()=>{
    if(listingId){
      getSearchingList(dispatch,listingId)
    }
    if (currUser.token && currUser.accountType==='Buyer') {
      getMyBag(dispatch,currUser.token,setNewFetching);
    }
  }, [])
  

  const myBag = useSelector(store=>store.bag);
  const fetching = useSelector(store=>store.fetching);
  const searchListings = useSelector(store=>store.listings);
  
 
  return (
     <>
          {(  fetching || newFetching)?
           <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 justify-items-center 2xl:px-10 mt-20">
           {/*  ------ Product Cart ------   */}
           {[1,2,3,4].map(num => {
             return <ListingSkeletonCard/>
           })}
    
         </div>
            :
            <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 justify-items-center 2xl:px-10 mt-20">
              {/*  ------ Product Cart ------   */}
              {searchListings.map(listing => {
                return <ListingCard listing={listing} myBag={myBag} />
              })}
    
            </div>
          }
        </>
  )
}
