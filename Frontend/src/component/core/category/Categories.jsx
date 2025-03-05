import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../../operations/category';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FilteredListing } from '../Listings/Admin/FilteredListing';
import EditModal from './EditModal';
import myImage from '../../../assets/rBgDataNotFound.png';

export default function Categories() {

  const categories = useSelector(store => store.category);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  let [hideSection_id, setHideSection_id] = useState(-1);

  useEffect(() => {
    getAllCategories(dispatch);
  }, [])


  // Edit cateory details
  const handleEditaregory = (category) => {
    setSelectedCategory(()=>category);
    return document.getElementById('my_modal_1').showModal()
  }
  const fetching = useSelector(store => store.fetching)

  if (fetching) {
    return <div className="min-h-[25rem] bg-background p-6 flex items-center justify-center w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
  }

  return (

    <div className="w-full min-h-[screen] bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 pt-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-lg font-bold text-gray-500 mb-8 text-center">PRODUCT CATEGORIES</h1>
        {categories.length === 0 ? (
          <div className="text-center">
            <img src={myImage} alt="" />
          </div>
        ) : (

          <div className='flex flex-col gap-y-3 mt-4'>
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
                    <h3 className="text-md font-bold text-yellow-600 ">{category.name}</h3>
                  </div>

                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                    <button
                      onClick={() => handleEditaregory(category)}
                      className="p-2 text-blue-600 hover:text-blue-700 transition-colors">
                      <FaEdit size={20} />
                    </button>

                  </div>

                </div>

                {/* category.description */}
                <div className={`${hideSection_id === category._id ? 'block border-t-2 mt-4 pt-2' : 'hidden'}`}>
                  <p className='text-[.95rem] md:text-[1.01rem]'>{category.description}</p>

                  <div className='flex gap-2 flex-wrap my-3'>
                  {category.relativeBrands.map(brand =>(
                    <span className='bg-blue-100 text-blue-800 text-sm font-semibold me-2 px-3 py-0.5 rounded-sm '>{brand.charAt(0)+brand.toLowerCase().substring(1,brand.length)}</span>
                  ))}
                  </div>

                </div>

                {hideSection_id === category._id &&
                  <FilteredListing categoryId={category._id} />
                }

              </div>
            ))}
            <EditModal category={selectedCategory} />
          </div>
        )}
      </div>
    </div>
  )
}
