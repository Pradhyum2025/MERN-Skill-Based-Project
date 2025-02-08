import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash } from "react-icons/fa";
import { getAllCategories } from '../../../operations/category';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Modal from './Modal';
import { FaUpRightFromSquare } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
export default function Categories() {

  const categories = useSelector(store => store.category);
  let [purpose , setPurpose] = useState('edit');
  let [selectCategory,setSelectCategory]= useState(null);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  let [hideSection_id, setHideSection_id] = useState(-1);
  
  useEffect(() => {
    getAllCategories(dispatch);
  }, [])
  
 
  const handleSetPurpose= (newPurpose,category)=>{
    setPurpose(newPurpose);
    setSelectCategory(category)
    document.getElementById('my_modal_1').showModal()
  }

  const handleGetSpecificCategory = async(category)=>{
    return navigate(`/dashbord/getCourseByCategory/${category._id}`,{state:{categoryName:category.name}})
  }

  return (

    <div className="w-full min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Categories</h1>
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">Your category is empty</p>
          </div>
        ) : (
          
          <div className='flex flex-col gap-y-3'>
            {categories.map((category) => (
              <div key={category._id} className='flex flex-col p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>

                <div className="flex items-center justify-between ">

                  <div 
                  onClick={() => {
                    if (hideSection_id === category._id) {
                      setHideSection_id(-1);
                    } else {
                      setHideSection_id(category._id)
                    }
                  }
                  }
                  className="flex items-center mb-4 md:mb-0 gap-x-4 cursor-pointer">
                    <span className='' >
                      <MdOutlineKeyboardArrowDown size={25} />
                    </span>
                    <h3 className="text-lg font-semibold text-indigo-600">{category.name}</h3>
                  </div>

                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  <button 
                    onClick={()=>handleSetPurpose('edit',category)}
                    className="p-2 text-indigo-600 hover:text-indigo-700 transition-colors">
                      <FaEdit size={20} />
                    </button>
                    
                    <button 
                    onClick={()=>handleSetPurpose('delete',category)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors">
                      <FaTrash size={20} />
                    </button>
                  
                    
                    <button
                    onClick={()=>handleGetSpecificCategory(category)} 
                    className="p-2  text-indigo-500 hover:text-indigo-700 hover:scale-110  transition-colors">
                      <FaUpRightFromSquare size={17} />
                    </button>

                  </div>
                
                </div>

                {/* category.description */}
                <div className={`${hideSection_id === category._id ? 'block border-t-2 mt-4 pt-2' : 'hidden'}`}>
                  <p className='text-[.95rem] md:text-[1.01rem]'>{category.description}</p>
                </div>


              </div>
            ))}
            <Modal purpose={purpose} category={selectCategory}/>
          </div>
        )}
      </div>
    </div>
  )
}
