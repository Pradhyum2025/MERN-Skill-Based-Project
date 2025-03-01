import React, { useState } from 'react'
import LoadingBtn from '../../common/LoadingBtn'
import { deleteReview } from '../../../operations/review'
import { useDispatch, useSelector } from 'react-redux';

export default function DeleteReviewBtn({ reviewId,listingId }) {
  
  const [newFetching, setNewFetching] = useState(false);
  const currUser = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const handleDeleteReview = () => {
    if (currUser.token && currUser.accountType === 'Buyer') {
      return deleteReview(dispatch, listingId, reviewId, currUser.token,setNewFetching)
    }
  }
  return (
    <button
      className="flex px-2 py-1 items-center gap-1 text-sm font-bold text-red-600  rounded-md hover:opacity-90 transition-opacity bg-gray-200 hover:bg-gray-400 hover:text-red-700 disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:text-red-400"
      onClick={handleDeleteReview}
    >
      {newFetching ?
        <LoadingBtn working={''} /> :
        'Delete'
      }
    </button>
  )
}
