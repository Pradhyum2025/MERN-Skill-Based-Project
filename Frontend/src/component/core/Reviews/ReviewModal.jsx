import React, { useState } from 'react'
import PostReview from './PostReview'

export default function ReviewModal({orderId, listingId}) {
    const [newFetching, setNewFetching] = useState(false);

  return (
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-gray-200 p-0"> 
            <button 
              type="button"
              disabled={newFetching}
              onClick={() => document.getElementById('my_modal_1').close()}
                class="absolute top-3 end-2.5 text-gray-500 bg-gray-200  hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  disabled:cursor-not-allowed" data-modal-hide="popup-modal">

                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>

                <span class="sr-only">Close modal</span>

              </button>
              <PostReview  orderId={orderId} listingId={listingId} newFetching={newFetching} setNewFetching={setNewFetching}/>
            </div>
          </dialog>
  )
}
