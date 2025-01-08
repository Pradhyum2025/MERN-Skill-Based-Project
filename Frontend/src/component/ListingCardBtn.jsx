import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from "react-hot-toast";
import axios from 'axios'
import { bagSliceAction } from '../store/Bag';

export default function ListingCardBtn({listing}) {

  const dispatch = useDispatch();
  let token = localStorage.getItem('token');
  // handle add to card
  const handleAddCard = async(product_id)=>{
    let currUser = localStorage.getItem('currUser');
    if(currUser){
      let response = await axios.get(`http://localhost:8080/user/bag/${product_id}`,{
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}` // Include token as a Bearer token
        }});

        if(response.data.success){
        dispatch(bagSliceAction.addToBag(response.data.currListing));

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
      
      if(response.data.success){  
      dispatch(bagSliceAction.removeToBag(product_id));
      toast.success(response.data.message,{
        duration: 1000,
      });
    }else{
      toast.error(response.data.message,{
        duration: 1000,
      });
    }
  }

  //fetch bag
  if(token){
    useEffect(()=>{
  
     let getBag = async()=>{  
         let response = await axios.get(`http://localhost:8080/user/bag/get`,{
           headers: {
             Authorization: `Bearer ${JSON.parse(token)}` // Include token as a Bearer token
           }});
  
         if(response.data){
           dispatch(bagSliceAction.inializeBag(response.data.bag))
         }
     }
     getBag();
  
   },[])

  }
  const bag = useSelector(store=>store.bag);

  return (
    <div className="card-actions justify-between">
    {
      (bag.length>0 && bag.findIndex(item => item._id === listing._id)!== -1)?
      <button 
      className="btn  btn-ghost text-base font-bold bg-blue-600 border-none hover:bg-blue-600 w-full border-[#ecba3d] text-[rgb(0,0,0)]"
      onClick={()=>handleRemoveCard(listing._id)}
      >
      Remove to bag
      </button>:
      <button 
      className="btn  btn-ghost text-base font-bold bg-[#ecba3d] border-none hover:bg-[#ecba3d] w-full border-[#ecba3d] text-[rgb(0,0,0)]"
      onClick={()=>handleAddCard(listing._id)}
      >
      Add to bag
      </button>
    }
  </div>
  )
}
