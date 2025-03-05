import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDefaultAddress } from '../../../operations/Address';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdderessCart({ address,setFetching }) {
  const currUser = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currRoute = useLocation().pathname;
 
  const handleSetDefault = async () => {
    if (currUser.token && (currUser.accountType === 'Buyer' || currUser.accountType === 'Seller')) {
      return await setDefaultAddress(dispatch, currUser.token, address._id,setFetching)
    } else {
      return document.getElementById('my_modal_3').showModal();
    }
  }

  const handleNavigate = () => {
    return navigate('/bag/order-summary')
  }
  return (
    <div className={`flex items-start gap-x-3 border-b-2 border-t-2 border-gray-200 px-4 pt-4 pb-2 w-[100%] ${address.isDefault ? 'bg-blue-100' : 'bg-gray-50'}`}>

      {address.isDefault ?
        <div className='p-[3px] cursor-pointer'>
          <input
            checked
            name='default'
            type='radio'
          />
        </div>
        :
        <div className='p-[3px] cursor-pointer'>
          <input
            defaultChecked={false}
            name='default'
            onClick={!address.isDefault && handleSetDefault}
            type='radio'
          />
        </div>
      }


      <div className='flex flex-col gap-y-2'>

        <div className='flex items-center gap-2'>
          <span className='text-gray-800 text-[.95rem] font-[700]'>{address.firstName + " " + address.lastName + "  -"}</span>

          <span className='text-gray-800 text-[.9rem] font-[700]'>{address.contact[0]}</span>
        </div>

        <div className='sm:w-[93%]'>
          <span className='text-gray-500 text-[.87rem] font-[500]'>{address?.streetAddress + ", " + address?.city + ", " + address?.state}</span>
          <span className='text-gray-900 text-[.80rem] font-[700]'>- {address?.postalCode}</span>
        </div>

        {(address.isDefault && currUser.accountType==='Buyer' && currRoute!=='/profile') &&
          <button
            onClick={handleNavigate}
            className='px-4 py-3 w-[40%] md:w-[30%] border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold'>
            CONTINUE
          </button> 
        }

      </div>

    </div>
  )
}
