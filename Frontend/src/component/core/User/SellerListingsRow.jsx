import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const SellerListingRow = ({ listing }) => {

  const navigate = useNavigate();

  const handleGetListingDetails = (listingId) => {
    return navigate(`/dashbord/show/${listingId}`, { state: { returnPath: '/dashbord' } });
  }


  return (
    <tr>

      {/* Preview image */}
      <td class="p-4 text-sm">
        <div
          onClick={() => handleGetListingDetails(listing?._id)}
          class="flex items-center cursor-pointer">
          <img src={listing?.images[0]} class="w-10 h-10  rounded shrink-0 bg-gray-100" />
          <div class="mx-4">
            <p class="text-sm text-black ">{listing?.productName?.length > 20 ? listing.productName.substring(0, 20) + '...' : listing.productName}</p>
          </div>
        </div>
      </td>

      {/* Price */}
      <td class="p-4 text-sm">
        Rs. {listing?.price}.00
      </td>

      {/* in stock */}
      <td class="p-4 text-sm">
        {listing?.stock}
      </td>

      {/* Sold out */}
      <td class="p-4 text-sm">
        200
      </td>

      {/* Ratings */}
      <td class="p-4 text-sm">
        <svg class="w-4 h-4 inline mr-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
            fill="#facc15" />
        </svg>
        <svg class="w-4 h-4 inline mr-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
            fill="#facc15" />
        </svg>
        <svg class="w-4 h-4 inline mr-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
            fill="#facc15" />
        </svg>
        <svg class="w-4 h-4 inline mr-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
            fill="#CED5D8" />
        </svg>
        <svg class="w-4 h-4 inline" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z"
            fill="#CED5D8" />
        </svg>
      </td>
    </tr>
  )
};