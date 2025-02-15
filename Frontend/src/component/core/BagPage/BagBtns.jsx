import React, { useState } from 'react'
import { addToBag, isPresentInCart, removeToBag } from '../../../operations/bag'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';
import { TbShoppingCartOff } from "react-icons/tb";
import LoadingBtn from '../../common/LoadingBtn.jsx'
export default function BagBtns({ listing, myBag, quantity }) {

  const currUser = useSelector(store => store.auth);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  const handleAddTocart = async (listing) => {
    if (currUser?.token && currUser?.accountType === 'Buyer') {
      return await addToBag(dispatch, listing, quantity, currUser.token, setFetching);
    } else {
      toast("SignUp / login as a buyer!",
        {
          icon: <FiAlertTriangle className="text-yellow-500" size={20} />,
          style: {
            background: "#fef3c7",
            color: "#b45309",
            padding: "10px",
          },
          position: 'bottom'
        });

      return document.getElementById('my_modal_3').showModal()
    }

  }

  const handleRemoveTocart = async (listingId) => {
    if (currUser?.token && currUser?.accountType === 'Buyer') {
      return await removeToBag(dispatch, listingId, currUser.token, setFetching);
    } else {
      toast("SignUp / login as a buyer!",
        {
          icon: <FiAlertTriangle className="text-yellow-500" size={20} />,
          style: {
            background: "#fef3c7",
            color: "#b45309",
            padding: "10px",
          },
          position: 'bottom'
        });

      return document.getElementById('my_modal_3').showModal()
    }
  }

  const { IsPresent, isPresentBagId } = isPresentInCart(listing, myBag)

  return (
    <>
      {IsPresent ?
        <button
          onClick={() => handleRemoveTocart(isPresentBagId)}
          type="button" class="inline-flex items-center rounded-lg bg-primary-600 px-3 py-2.5 text-sm font-medium items-center gap-x-2 text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 ">
          {fetching ?
            <LoadingBtn working={'Adding...'} /> :
            <>
              <TbShoppingCartOff className='text-lg font-[900]' />
              Remove to cart
            </>
          }
        </button>
        :
        <button
          onClick={() => handleAddTocart(listing)}
          type="button" class="inline-flex items-center rounded-lg bg-primary-600 px-3 py-2.5 text-sm font-medium items-center gap-x-2 text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 ">
          {fetching ?
            <LoadingBtn working={'Adding...'} /> :
            <>
              <MdOutlineAddShoppingCart className='text-lg font-[900]' />
              Add to cart
            </>
          }
        </button>
      }

    </>
  )
}
