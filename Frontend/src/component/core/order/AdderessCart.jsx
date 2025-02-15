import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDefaultAddress } from '../../../operations/Address';
import { useNavigate } from 'react-router-dom';

export default function AdderessCart({ address }) {
  const currUser = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetDefault =async ()=>{
  if(currUser.token && currUser.accountType==='Buyer'){
    return await setDefaultAddress(dispatch,currUser.token,address._id)
  }else{
    return  document.getElementById('my_modal_3').showModal();
  }
  }

  const handleNavigate = ()=>{
   return navigate('/bag/order-summary')
  }
  return (
    <div className={`flex items-start gap-x-3 px-4 pt-4 pb-2 w-[100%] ${address.isDefault?'bg-blue-50 border-b-2 border-gray-200':null}`}>

      <div className='p-[3px] cursor-pointer'>
        <input
        defaultChecked={address.isDefault}
        onClick={ !address.isDefault && handleSetDefault}
         type='radio'
         className='bg-white border-blue cursor-pointer'
          />

      </div>

      <div className='flex flex-col gap-y-2'>

        <div className='flex items-center gap-2'>
          <span className='text-gray-800 text-[.99rem] font-[700]'>{address.firstName + " " + address.lastName}</span>

          <span className='text-gray-800 text-[.9rem] font-[700]'>{address.contact[0]}</span>
        </div>

        <div className='w-[80%]'>
         <span className='text-gray-600 text-[.86rem] font-medium'>{address?.streetAddress + ", "+ address?.city + ", " + address?.state}</span>
          <span className='text-gray-800 text-[.87rem] font-[700]'>- {address?.postalCode}</span>
        </div>
     
     {address.isDefault?
      <button
      onClick={handleNavigate}
      className='px-4 py-3 w-[45%] border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold'>
       CONTINUE
      </button>:
      null
     }

      </div>

    </div>
  )
}
