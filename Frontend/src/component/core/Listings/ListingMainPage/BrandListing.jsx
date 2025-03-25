import React, { useEffect, useState } from 'react'
import ListingSkeletonCard from './ListingSkeletonCard'
import ListingCard from './ListingCard'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getRelativeBrandProducts } from '../../../../operations/listing';
import { getMyBag } from '../../../../operations/bag';
import noDataImage from '../../../../assets/rBgDataNotFound.png'

export default function BrandListing() {
  const [searchParams] = useSearchParams();

  let category = searchParams.get('category');
  let brandName = searchParams.get('brand');
  const currPath = useLocation().pathname;
  const productInfo = {
    category,
    brandName: brandName.toUpperCase()
  }

  const dispatch = useDispatch();
  const [newFetching, setNewFetching] = useState(false)

  const currUser = useSelector(store => store.auth);

  useEffect(() => {
    if (brandName && category) {
      getRelativeBrandProducts(dispatch, productInfo);
    }
    if (currUser.token && currUser.accountType === 'Buyer') {
      getMyBag(dispatch, currUser.token,setNewFetching);
    }

  }, [])

  const currentBrandListings = useSelector(store => store.listings);
  const myBag = useSelector(store => store.bag);
  const fetching = useSelector(store=>store.fetching);
  
  return (
    <div className='pt-20'>
      {fetching ?
        <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 justify-items-center 2xl:px-10">
          {/*  ------ Product Cart ------   */}
          {[1, 2, 3, 4].map(num => {
            return <ListingSkeletonCard />
          })}

        </div>
        :<>
        {currentBrandListings.length===0?
        <div>
          <img src={noDataImage} alt="" className='sm:aspect-[13/6] p-3 md:px-[4rem] md:pb-10'/>
        </div>
        :
        <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 justify-items-center 2xl:px-10">
          {/*  ------ Product Cart ------   */}
          {currentBrandListings.map(listing => {
            return <ListingCard listing={listing} myBag={myBag} />
          })}

        </div>
        }
        </>
      }
    </div>
  )
}
