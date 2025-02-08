import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function SellerListingCard({item}) {
  
  let date=new Date(item.createdAt);
  let monthName=date.toLocaleString('default', { month: 'long' }); 
  let year=date.getFullYear();
  console.log(date)


  const navigate = useNavigate();
  //token
  let token = localStorage.getItem('token');

  //delete item from listing

  
  //edit items
  const handleEditItem=async(item)=>{
    localStorage.setItem('editListing',JSON.stringify(item));
    navigate('/edit')
  }

  return (
    <div
    key={item._id}
    className="bg-white shadow-lg rounded-lg p-4 pb-1 flex flex-col"
  >
    <img
      src={item.image || "https://via.placeholder.com/150"}
      alt={item.nameWithModel}
      className="w-full h-40  rounded-lg mb-4"
    />
    <h4 className="text-lg font-semibold mb-2 text-[#ecba3d]">
      {item.nameWithModel}
    </h4>
    <p className="text-gray-700 mb-2">
      <strong>Price:</strong> {new Intl.NumberFormat('en-IN', {
style: 'currency',
currency: 'INR',
}).format(item.price)}
    </p>
    <p className="text-gray-700 mb-2">
      <strong>Warranty:</strong> {item.warranty}
    </p>
    <p className="text-gray-700 mb-2">
      <strong>Category:</strong> {item.catagory}
    </p>
    <p className="text-gray-700">
      <strong>Features:</strong>
    </p>
    <ul className="list-disc pl-5 text-gray-700">
      {item.features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>

    <div className='w-full flex justify-between px-3 mt-5'>
      <button 
      onClick={()=>handleEditItem(item)}
      className='btn h-[2rem] min-h-[2rem] bg-blue-600 border-none'
      >Edit</button>
      <button 
      onClick={()=>handleDeleteItem(item._id)}
      className='btn h-[2rem] min-h-[2rem] bg-red-600 border-none'
      ><MdDelete className='text-[1.2rem]'/></button>
    </div>
    <p className="text-gray-700 mt-5 w-full flex justify-end gap-1">
      <span className='text-sm font-[600]'>Last modification : </span>
      <span className='text-sm font-[400]'>
            { monthName.toLowerCase() +" "+year}
      </span>
    </p>
  </div>
  )
}
