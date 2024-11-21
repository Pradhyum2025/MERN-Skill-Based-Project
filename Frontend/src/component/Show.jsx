import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listinSlicegAction } from '../store/listings';
import getItemSlice, { getItemSliceAction } from '../store/getItem';
import { authSliceAction } from '../store/auth';
import { bagSliceAction } from '../store/Bag';
import toast from 'react-hot-toast';
import PostReview from './PostReview';
import { useLocation, useParams } from 'react-router-dom';
import { loadingSliceAction } from '../store/loading';
import ReviewCard from './ReviewCard';

export default function Show() {
  const dispatch =useDispatch();
  const {product_id}=useParams();
  
  useEffect(()=>{

    let fetchListng = async()=>{

      dispatch(loadingSliceAction.initializeLoading())
      let response = await axios.get(`http://localhost:8080/listing/show/${product_id}`)
      if(response.data){
        dispatch(getItemSliceAction.saveItem(response.data.data));
        dispatch(loadingSliceAction.deinitalizeLoading())
      }
     }

    fetchListng();

  },[])
  

  //handle add to remove
  let token = localStorage.getItem('token');

  // handle add to card
  const handleAddCard = async(product_id)=>{
    let currUser = localStorage.getItem('currUser');
    if(currUser){
      let response = await axios.get(`http://localhost:8080/user/bag/${product_id}`,{
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}` // Include token as a Bearer token
        }});
        
        if(response.data){
          localStorage.setItem('currUser',JSON.stringify(response.data.currUser));
          dispatch(authSliceAction.initializeAuther(response.data.currUser));
        }
        if(response.data.success){
        dispatch(bagSliceAction.addToBag());
        toast.success(response.data.message,{
          duration: 1000,
        });
      }else{
        toast.error(response.data.message,{
          duration: 1000,
        });
      }
    }else{
      document.getElementById('my_modal_3').showModal()
      toast.error("For add to card! Login please",{
        position: 'bottom-right',
      });
    }
  }


  //handle remove to bag
  const handleRemoveCard = async(product_id)=>{
    let response = await axios.delete(`http://localhost:8080/user/bag/${product_id}`,{
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}` // Include token as a Bearer token
      }});
      
      if(response.data){
        console.log(response.data);
        localStorage.setItem('currUser',JSON.stringify(response.data.currUser));
        dispatch(authSliceAction.initializeAuther(response.data.currUser));
      }
      if(response.data.success){  
      dispatch(bagSliceAction.removeToBag());
      toast.success(response.data.message,{
        duration: 1000,
      });
    }else{
      toast.error(response.data.message,{
        duration: 1000,
      });
    }
  }

  let currUser = useSelector(store=>store.auth);
  let fetching = useSelector(store=>store.loading)
  let product = useSelector(store=>store.Item);

  if(fetching){
     return(
     <div role="status" className='w-full flex justify-center items-center bg-white h-[50vh]'>
      <div>
    <svg aria-hidden="true" className=" inline w-[5rem] h-[5rem] text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
      </div>
   </div>
     )
    }else{
    
    return (
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          {/* Product Image */}
          <div className="flex justify-center bg-gray-50">
            <img
              src={product.image}
              alt={product.nameWithModel}
              className="h-96 object-cover w-full"
            />
          </div>
  
          {/* Product Details */}
          <div className="p-6">
            
            <h1 className="text-2xl font-bold text-gray-800">{product.nameWithModel}</h1>
            <p className="text-lg text-gray-600 mt-2">Category: {product.catagory}</p>
  
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-700">Features:</h2>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {product.features.map((feature, index) => (
                  <li key={index} >{feature} </li>
                ))}
              </ul>
            </div>
  
            <div className="mt-4">
              <p className="text-lg font-medium text-gray-700">
                Warranty: <span className="font-normal">{product.warranty}</span>
              </p>
            </div>
  
            <div className="mt-4">
              <p className="text-2xl font-bold text-green-600">
              {new Intl.NumberFormat('en-IN', {
               style: 'currency',
               currency: 'INR',
               }).format(product.price)}
              </p>
            </div>
  
            {/* Add to Cart Button */}
            <div className="mt-6">
              {(currUser && currUser.bag.indexOf(product._id) !== -1)?
              <button
              onClick={()=>handleRemoveCard(product._id)}
               className="w-full bg-blue-600 text-[1rem] font-bold text-white py-3 rounded-lg  transition duration-300">
               Remove to bag
            </button>:
            <button 
            onClick={()=>handleAddCard(product._id)}
            className="w-full text-[1rem] font-bold bg-[#ecba3d] text-white py-3 rounded-lg  transition duration-300">
             Add to bag
            </button>}
              
            </div>

          </div>
        </div>
   
      {/* review section */}
        <div className='w-full mx-auto bg-white  md:flex  md:px-5 justify-around  shadow-lg rounded-lg overflow-hidden mt-5'>
          {product.reviews.length>0?
            <ul className='md:w-[40%]  flex  justify-center flex-col gap-5 md:my-10 bg-white p-5 rounded-lg shadow-lg'>
            {
              product.reviews.map((review)=>{
                return <ReviewCard key={review._id} currReview={review} listingId={product._id}/> 
              })
            }
           </ul>:<div className='md:w-[40%]  flex  justify-center items-center flex-col gap-5 md:my-10 bg-white p-5 rounded-lg shadow-lg'>
            <p className='text-[1.2rem] font-[600] text-gray-600'>No review here</p>
              <img src="..\public\customer-testimonial-illustration_9829-86.avif" className='w-[80%] h-[70%]' alt="" />
           </div>
          }

          <PostReview listing_id={product._id}/>
         
        </div>
      </div>
    );
  };
}