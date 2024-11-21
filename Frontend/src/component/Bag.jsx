import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getItemSliceAction } from '../store/getItem';
import BagListingCard from './BagListingCard';


export default function Bag() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);

  let token = localStorage.getItem('token');
  useEffect(()=>{
    let getBag = async()=>{
        
        let response = await axios.get(`http://localhost:8080/user/bag/get`,{
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}` // Include token as a Bearer token
          }});

        if(response.data){
          console.log(response.data.bag);
          setCartItems(response.data.bag);
        }
    }
    getBag();
  },[])

  let totalPrice =cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price;
    }, 0)


  
  
  return (
    <>
    {cartItems.length>0?
     <div className='min-h-[70vh]'>
     <div className="flex flex-col lg:flex-row justify-between p-4 space-y-4 lg:space-y-0 lg:space-x-6">
       {/* Left Side: Bag Items */}
       <div className="w-full lg:w-3/4 bg-white shadow-md rounded-lg p-4">
         <h2 className="text-xl font-bold border-b pb-2 mb-4 text-[#ecba3d]">My Bag</h2>
         {cartItems.map((item) => ( 
          <BagListingCard key={item._id} item={item}/>
         ))}
       </div>
 
       {/* Right Side: Summary */}
       <div className="w-full lg:w-1/4 bg-white shadow-md rounded-lg p-4">
         <h2 className="text-xl font-bold border-b pb-2 mb-4">Order Summary</h2>
         <div className="flex justify-between mb-4">
           <span>Total Items:</span>
           <span>{cartItems.length}</span>
         </div>
         <div className="flex justify-between mb-4">
           <span>Total Price:</span>
           <span className="font-semibold">Rs.{totalPrice.toFixed(2)}</span>
         </div>
         <button
           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
         >
           Buy Now
         </button>
       </div>
     </div>
     </div>:
     <p className='text-[2rem] flex justify-center py-10 bg-white m-0 border border-black text-black font-semibold min-h-[60vh]'>No item here</p>
  }
    </>
   
  );
};

