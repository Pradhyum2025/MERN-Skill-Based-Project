import React from 'react'
import { useSelector } from 'react-redux';
import LoadingBtn from '../../../common/LoadingBtn';

export default function OtpVerifyBtn() {
  const fetching = useSelector(store => store.fetching);

  return (
    <div class="max-w-[260px] mx-auto mt-4">
    <button 
    type="submit"
      class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">
        {fetching?
        <LoadingBtn working={'Verifying..'}/>
      :
      'Verify Account'
      }
      </button>
  </div>
  )
}
