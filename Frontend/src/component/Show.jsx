import axios from 'axios';
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getItemSliceAction } from '../store/getItem';
import { useParams } from 'react-router-dom';
import { loadingSliceAction } from '../store/loading';
import ReviewCard from './ReviewCard';
import ListingCardBtn from './ListingCardBtn';
import Loader from './Loader';

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

  let fetching = useSelector(store=>store.loading)
  let product = useSelector(store=>store.Item);

  if(fetching){
     return(
     <Loader/>
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
            <ListingCardBtn listing={product}/>

          </div>
        </div>
   
      {/* review section */}
        {/* <div className='w-full mx-auto bg-white  md:flex  md:px-5 justify-around  shadow-lg rounded-lg overflow-hidden mt-5'>
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
         
        </div> */}
      </div>
    );
  };
}