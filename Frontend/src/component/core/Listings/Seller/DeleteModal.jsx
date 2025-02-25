import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteLisitng } from '../../../../operations/listing';
import LoadingBtn from '../../../common/LoadingBtn';
export default function DeleteModal({listingDetails}) {
  const [fetching, setFetching] = useState(false);
  const currUser = useSelector(store => store.auth);
  const dispatch = useDispatch();
  //Add to cart Handler
  const handleDeleteListing = (listingId) => {
    if (currUser.token && currUser?.accountType == 'Seller') {
      return deleteLisitng(dispatch, currUser.token, listingId, setFetching);
    } else {
      return document.getElementById('my_modal_3').showModal();
    }
  }
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-gray-800 text-black p-0 ">

          <div class="relative  w-full  max-h-full">
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 p-4">
           
           {/* Close btn */}
              <button 
              type="button"
              disabled={fetching}
                onClick={() => document.getElementById('my_modal_3').close()}
                class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white disabled:cursor-not-allowed" data-modal-hide="popup-modal">

                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>

                <span class="sr-only">Close modal</span>

              </button>

              <div class="p-4 md:p-5 text-center">
                {/* Icon */}
                <svg class="mx-auto mb-4 text-gray-400 w-9 h-9 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <p className='text-gray-500 text-md font-semibold my-1'>{listingDetails?.productName}</p>
                 
                <h3 class="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>

                <button
                disabled={fetching}
                onClick={()=>handleDeleteListing(listingDetails._id)}
                 data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center disabled:cursor-not-allowed">
                  {fetching?
                  <LoadingBtn working={'Deleting..'}/>:
                  "Yes, I'm sure"
                  }
                  
                </button>

                <button 
                 disabled={fetching}
                 onClick={() => document.getElementById('my_modal_3').close()}
                data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 disabled:cursor-not-allowed">No, cancel</button>

              </div>
            </div>
          </div>

        </div>

      </dialog>
    </div>
  )
}
