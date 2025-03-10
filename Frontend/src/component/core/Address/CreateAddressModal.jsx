import React, { useState } from 'react'
import AddressForm from './AddressForm'
import { useSelector } from 'react-redux'


export default function CreateAddressModal() {
  const [fetching,setFetching] = useState(false);
  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white pt-2">
          <button
            type="button"
            disabled={fetching}
            onClick={() => document.getElementById('my_modal_1').close()}
            class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-500 dark:hover:text-white disabled:cursor-not-allowed" data-modal-hide="popup-modal">

            <svg class="w-3 h-3 text-gray-700 hover:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>

            <span class="sr-only">Close modal</span>

          </button>
          <AddressForm fetching={fetching} setFetching={setFetching}/>
        </div>
      </dialog>
    </div>
  )
}
