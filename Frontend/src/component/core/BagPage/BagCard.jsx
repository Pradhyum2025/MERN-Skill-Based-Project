import { FaTrash } from "react-icons/fa";
import { decQuantity, incQuantity, removeToBag } from "../../../operations/bag";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import LoadingBtn from "../../common/LoadingBtn";
import { useNavigate } from "react-router-dom";
import { LuMinus } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import toast from "react-hot-toast";
import { IoWarning } from "react-icons/io5";

export const BagCard = ({ bagItem }) => {

  const currUser = useSelector(store => store.auth);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Add to cart Handler
  const handleRemoveToBag = () => {
    if (currUser.token && currUser.accountType === 'Buyer') {
      removeToBag(dispatch, bagItem._id, currUser.token, setFetching);
    } else {
      return;
    }
  }


  const increaseQuantity=()=>{
    if(currUser.token && currUser.accountType==='Buyer'){
      return incQuantity(dispatch,currUser.token,setFetching,bagItem._id)
    }else{
     return toast('Something went wrong',{
      icon:<IoWarning/>,
      style:{
        background:'#000000'
      }
     })
    }
  }

  
  const decreaseQuantity=()=>{
    if( currUser.token && currUser.accountType==='Buyer'){
      return decQuantity(dispatch,currUser.token,setFetching,bagItem._id,)
    }else{
      return toast('Something went wrong',{
        icon:<IoWarning style={{color:'#ffb31a'}} />,
        style:{
          background:'#001a00',
          color:'#f2f2f2',
          borderRadius:'0px'
        },
        position:'bottom-center'
       })
    }
  }

  const handleNavigatation = () => {
    return navigate(`/show/${bagItem.product}`, { state: { returnPath: `/dashbord/cart` } })
  }

  return (
    <div className="flex  items-center justify-between  p-4 bg-white  shadow-md  transition-shadow duration-300 relative">
      <div className="flex flex-row gap-x-2 items-center  md:mb-0">


        <img  
          onClick={() => handleNavigatation()}
          src={bagItem?.images?.[0]}
          alt={bagItem?.productName}
          className="w-24 h-24 object-cover rounded-lg mb-0 md:mb-0 md:mr-6 cursor-pointer"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
          }}
        />


        <div className="text-left flex gap-y-2 flex-col justify-between items-start h-full">

          <h3
            onClick={() => handleNavigatation()}
            className="md:text-lg font-semibold text-blue-600 hover:underline cursor-pointer">{bagItem?.productName?.length>30?bagItem?.productName?.substring(0,27)+'..':bagItem?.productName}</h3>

          <p className="text-gray-600">{new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
          }).format(bagItem?.price)}
          </p>

          {/* Stock */} 
          {
            bagItem?.stock === 0 ?
              <span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm w-[35%] sm:w-[30%] ">Out of stock</span>
              :
              <div class="flex gap-1 items-center border border-gray-300 bg-white px-2 py-[3px] w-max">
                <button
                onClick={decreaseQuantity}
                 type="button" class="border-none outline-none">
                  <LuMinus className='text-gray-900'   />
                </button>
                <span class="text-gray-800 text-sm font-semibold px-3">{bagItem.quantity}</span>
                <button
                 onClick={increaseQuantity}
                 type="button" class="border-none outline-none">
                  <GoPlus className='text-gray-900'/>
                </button>
              </div>
          }
        </div>

      </div>

      <div className={`absolute top-[0px] right-[2px]  md:relative flex flex-col md:flex-row items-start  md:space-y-0 gap-x-5 `}>
        <button
          disabled={fetching}
          onClick={() => handleRemoveToBag()}
          className="p-2 flex text-red-500 hover:text-red-700 transition-colors disbaled:cursor-not-allowed"
        >
          {fetching ?
            <LoadingBtn working={''} /> :
            <FaTrash size={20} />
          }
        </button>
      </div>
    </div>
  )
};