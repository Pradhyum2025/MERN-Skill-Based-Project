import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSellersDetails } from '../../../operations/seller';
import { useLocation, useParams } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdMarkEmailRead, MdOutlinePhone } from 'react-icons/md';
import { AiTwotoneShop } from 'react-icons/ai';
import { GiRotaryPhone } from 'react-icons/gi';
import { HiCurrencyRupee } from 'react-icons/hi';
import SubOrderCart from '../order/Admin/SubOrderCart';
import { SellerListingRow } from './SellerListingsRow';

export default function SellerDetails() {
  const currUser = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const { sellerId } = useParams();

  useEffect(() => {
    if (currUser.token && sellerId) {
      getSellersDetails(dispatch, sellerId, currUser.token);
    }
  }, [])


  const sellerArray = useSelector(store => store.seller);
  const sellerDetails = sellerArray.length > 0 ? sellerArray?.[0] : null

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
      case "refunded":
        return "bg-yellow-100 text-yellow-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
      case "processing":
        return "bg-blue-100 text-blue-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
      case "cancelled":
        return "bg-red-100 text-red-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
      default:
        return "bg-pink-100 text-pink-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm";
    }
  };

console.log(sellerDetails)
  if (!sellerDetails) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center w-full border-b-2 border-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 w-full">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Seller Info */}
        <div className="">
          <h2 className="text-lg font-heading text-gray-600 font-semibold mb-2">SELLER ACCOUNT</h2>
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
            <p className='text-gray-600 fonr-md font-semibold flex items-center gap-3'>Seller ID : <span className='bg-blue-100 text-blue-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm'>#{sellerDetails._id}</span></p>
            <div className='flex sm:items-center gap-y-5 sm:gap-10 flex-col sm:flex-row'>
              <p className="text-yellow-600  text-md font-bold flex items-center gap-1"><FaRegUserCircle className='text-blue-600 text-2xl' />{sellerDetails?.firstName + " " + sellerDetails?.lastName}</p>
              <p className="text-gray-500  text-sm font-semibold flex items-center gap-1"><MdMarkEmailRead className='text-blue-600 text-2xl' />{sellerDetails?.email}</p>
              <p className="text-gray-600  text-sm font-bold flex items-center gap-1"><MdOutlinePhone className='text-blue-600 text-xl' />{sellerDetails?.contact?.[0]}</p>
            </div>
            <p className='text-gray-600 fonr-md font-bold'>Company / Store / Shop Details :</p>
            <div className='flex items-center gap-2'>
              <p className="text-blue-600  text-2xl  font-semibold"><AiTwotoneShop /></p>
              <p className="text-gray-500  text-[1rem]  font-semibold">{sellerDetails?.sellerDetails?.companyName}</p>
            </div>
            <div className='flex items-center gap-2'>
              <p className="text-gray-600  text-sm font-semibold"><GiRotaryPhone className='text-blue-500  text-2xl  font-semibold' /></p>
              {sellerDetails?.sellerDetails?.contact?.map(contact => (
                <p className="text-gray-500  text-sm text-sm font-semibold">{contact}</p>
              ))}
            </div>

          </div>
        </div>

        {/* Product List */}
        <div className="bg-gray-50  w-full">
        <div className="max-w-7xl mx-auto bg-card rounded-lg shadow-sm sm:px-6 sm:py-2">
          <h2 className="text-lg font-heading text-gray-600 font-semibold mb-2">{currUser.accountType==='Seller'?'MY PRODUCT LIST':'PRODUCT LIST'}</h2>
          {sellerArray.listing?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-xl">There is no item found</p>
            </div>
          ) : (
            <div
              class="overflow-x-auto sm:overflow-x-visible font-[sans-serif]">

              <table class="min-w-full bg-white">
                {/* Table head */}
                <thead class="bg-blue-200 whitespace-nowrap">
                  <tr>
                    <th class="p-4 text-left text-sm font-semibold text-black">
                      Product
                    </th>
                    <th class="py-4 text-left text-sm font-semibold text-black flex items-center gap-1 flex-start">
                      Price <HiCurrencyRupee className="text-lg" />
                    </th>
                    <th class="p-4 text-left text-sm font-semibold text-black">
                      In stock
                    </th>
                    <th class="p-4 text-left text-sm font-semibold text-black">
                      Sales
                    </th>
                    <th class="p-4 text-left text-sm font-semibold text-black">
                      Rating
                    </th>
                  </tr>
                </thead>
                {/* table body */}
                <tbody class="whitespace-nowrap divide-y divide-gray-200">
                  {/* Table rows */}
                  {sellerDetails.listing?.length > 0 && sellerDetails.listing.map(items => {
                    return <SellerListingRow listing={items} />
                  })}
                </tbody>

              </table>

              {/* Pagging */}
              <div class="md:flex m-4">
                <p class="text-sm text-gray-500 flex-1">Showind 1 to 5 of 100 entries</p>
                <div class="flex items-center max-md:mt-4">
                  <p class="text-sm text-gray-500">Display</p>

                  <select class="text-sm text-gray-500 border border-gray-400 rounded h-8 px-1 mx-4 outline-none bg-white   ">
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                  </select>

                  <ul class="flex space-x-1 ml-4">
                    <li class="flex items-center justify-center cursor-pointer bg-gray-200 w-8 h-8 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-gray-500" viewBox="0 0 55.753 55.753">
                        <path
                          d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                          data-original="#000000" />
                      </svg>
                    </li>
                    <li class="flex items-center justify-center cursor-pointer text-sm w-8 h-8 rounded">
                      1
                    </li>
                    <li class="flex items-center justify-center cursor-pointer text-sm bg-[#007bff] text-white w-8 h-8 rounded">
                      2
                    </li>
                    <li class="flex items-center justify-center cursor-pointer text-sm w-8 h-8 rounded">
                      3
                    </li>
                    <li class="flex items-center justify-center cursor-pointer text-sm w-8 h-8 rounded">
                      4
                    </li>
                    <li class="flex items-center justify-center cursor-pointer bg-gray-200 w-8 h-8 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-gray-500 rotate-180" viewBox="0 0 55.753 55.753">
                        <path
                          d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                          data-original="#000000" />
                      </svg>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          )}
        </div>
        </div>

        {/* Orders */}
        <div className="bg-gray-50  w-full">
          <div className="max-w-7xl mx-auto bg-card rounded-lg shadow-sm sm:p-6">
            <h1 className="text-lg font-[700] text-gray-500 mb-3">{currUser.accountType==='Seller'?'MY ORDERS SUMMARY':'ORDERS SUMMARY'}</h1>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-blue-200">
                    <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Sub-Order Id</th>
                    <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Date</th>
                    <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Sub-Order Status</th>
                    <th className="py-4 px-6 text-left text-[.94rem] font-heading text-gray-800">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {sellerDetails?.myOrders?.map((subOrder) => {
                    return <SubOrderCart key={subOrder._id} subOrder={subOrder} />
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
