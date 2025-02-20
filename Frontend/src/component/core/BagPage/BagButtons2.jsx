import React, { useState } from 'react'
import { addToBag, isPresentInCart, removeToBag } from '../../../operations/bag'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';
import LoadingBtn from '../../common/LoadingBtn';

export const BagButtons2 = ({ listing, myBag, quantity }) => {

  const currUser = useSelector(store => store.auth);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  const handleAddTocart = async (listing) => {
    if (currUser?.token && currUser?.accountType === 'Buyer') {
      return await addToBag(dispatch, listing, quantity, currUser.token, setFetching);
    } else {
      toast("SignUp / login as a buyer!",
        {
          icon: <FiAlertTriangle className="text-yellow-600" size={20} />,
          style: {
            background: "#00100d",
            color: "#b8971d",
            fontWeight:900,
            padding: "10px",
            borderRadius:'0px',
          },
          position: 'bottom-center'
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
          icon: <FiAlertTriangle className="text-yellow-600" size={20} />,
          style: {
            background: "#00100d",
            color: "#b8971d",
            fontWeight:900,
            padding: "10px",
            borderRadius:'0px',
          },
          position: 'bottom-center'
        });

      return document.getElementById('my_modal_3').showModal()
    }
  }
  const { isPresent, isPresentBagId } = isPresentInCart(listing, myBag)
  return (
    <>
      {isPresent ?
        <button type="button"
          onClick={() => handleRemoveTocart(isPresentBagId)}
          class="px-4 py-3 w-[45%] border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold">
          {fetching ?
            <LoadingBtn working={'Removing to cart...'} />
            :
            'Remove to cart'
          }
        </button>
        :
        <button type="button"
          onClick={() => handleAddTocart(listing)}
          class="px-4 py-3 w-[45%] border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold">
          {fetching ?
            <LoadingBtn working={'Adding to cart...'} />
            :
            'Add to cart'
          }

        </button>
      }

    </>
  )
}
