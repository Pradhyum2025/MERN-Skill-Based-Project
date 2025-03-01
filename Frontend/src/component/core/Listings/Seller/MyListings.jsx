import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { MyListingCard } from "./MyListingCard";
import { getMyListings } from "../../../../operations/listing";
import { HiCurrencyRupee } from "react-icons/hi";
import DeleteModal from "./DeleteModal";

export const MyListing = () => {
  const currUser = useSelector(store => store.auth)
  const dispatch = useDispatch();
  const [listingDetails ,setListingDetails] = useState({
    productName:'',
    _id:''
  });

  useEffect(() => {
    if (currUser?.accountType === 'Seller' && currUser.token) {
      getMyListings(dispatch, currUser.token)
    } else {
      return;
    }
  }, [])

  const myListings = useSelector(store => store.listings);
  const fetching = useSelector(store=>store.fetching)

  if (fetching) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (

    <div className="w-full min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 pt-10">
      <div className="max-w-4xl mx-auto">

      <h1 className="text-lg font-[700] text-gray-500 mb-3">MY PRODUCTS</h1>

        {myListings?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 font-[900] text-xl">Your Listing is empty</p>
          </div>
        ) : (
          <div
           class="overflow-x-auto sm:overflow-x-visible font-[sans-serif]">

            <table class="min-w-full bg-white">
              {/* Table head */}
              <thead class="bg-gray-100 whitespace-nowrap">
                <tr>
                  <th class="p-4 text-left text-sm font-semibold text-black">
                    Product
                  </th>
                  <th class="py-4 text-left text-sm font-semibold text-black flex items-center gap-1 flex-start">
                    Price <HiCurrencyRupee className="text-lg"/>
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
                  <th class="p-4 text-left text-sm font-semibold text-black">
                    Action
                  </th>
                </tr>
              </thead>
              {/* table body */}
              <tbody class="whitespace-nowrap divide-y divide-gray-200">
                {/* Table rows */}
              {myListings && myListings.map(listing=>{
                return <MyListingCard listing={listing} setListingDetails={setListingDetails}/>
              })}
              </tbody>

            </table>

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

            <DeleteModal listingDetails={listingDetails}/>
          </div>
        )}
      </div>
    </div>

  );
};

