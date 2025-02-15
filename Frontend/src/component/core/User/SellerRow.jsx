import React from 'react'

export default function SellerRow({seller}) {
  return (
    <tr>
    <td class="p-4 text-sm">
      <div class="flex items-center cursor-pointer w-max">
        <img src='https://readymadeui.com/profile_4.webp' class="w-9 h-9 rounded-full shrink-0" />
        <div class="ml-4">
          <p class="text-sm text-black">{seller.firstName +" "+seller.lastName}</p>
          <p class="text-xs text-gray-500">{seller.email}</p>
        </div>
      </div>
    </td>
    <td class="p-4 text-sm">
      {seller?.sellerDetails?.companyName}
    </td>
    <td class="px-6 py-3">
    {seller?.sellerDetails?.contact[0]}
    </td>
    <td class="px-6 py-3">
      <svg class="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
          fill="#facc15" />
      </svg>
      <svg class="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
          fill="#facc15" />
      </svg>
      <svg class="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
          fill="#facc15" />
      </svg>
      <svg class="w-[18px] h-4 inline mr-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
          fill="#CED5D8" />
      </svg>
      <svg class="w-[18px] h-4 inline" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
          fill="#CED5D8" />
      </svg>
    </td>
    
    <td class="p-4">
      <label class="relative cursor-pointer">
        <input type="checkbox" class="sr-only peer"  />
        <div
          class="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500">
        </div>
      </label>
    </td>

  </tr>
  )
}
