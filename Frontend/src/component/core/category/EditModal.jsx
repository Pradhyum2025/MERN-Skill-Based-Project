import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../../operations/category';
import LoadingBtn from '../../common/LoadingBtn';
import { RxCross2 } from 'react-icons/rx';
import { FiUploadCloud } from 'react-icons/fi';


export default function EditModal({ category }) {
  const currUser = useSelector(store => store.auth);
  const fetching = useSelector(store => store.fetching)
  const dispatch = useDispatch();

  const [relatedImage, setrRelatedImage] = useState('');
  const [isURL, setIsURL] = useState(true);

  const {
    register,
    handleSubmit,
    reset, // Used to update form fields with existing data
    formState: { errors },
  } = useForm();

  useEffect(()=>{
    if(category){
      reset({name:category.name,description:category.description});
      setrRelatedImage(category?.relatedImage)
      setIsURL(true);
    }
  },[category,reset])

  const onSubmit = async (data) => {
    if (currUser.token) {
      try {
        await updateCategory(dispatch,category._id, data, currUser.token);
      } catch (error) {
        console.log(error)
      }
    } else {
      return;
    }
  }

  
  const handleImageUpload = (e) => {
    setIsURL(false);
    console.log(e.target.files)
    return setrRelatedImage(()=>e.target.files[0]);
  };

  const removeImage = () => {
    return setrRelatedImage("");
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-slate-100 pt-2">
          <h1 className='w-full text-center text-blue-700 text-[1.5rem] font-bold my-2'>Update category details</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col items-start mb-2'>
              <label for="first_name" class="block mb-2 text-md font-semibold text-gray-800 ">Name</label>
              <input
                type="text"
                name='name'
                class="bg-gray-50 border border-gray-300 text-blue-800 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Name"
                {...register("name", {
                  required: { value:true, message: 'Name  is reuired' }
                 })}
              />
              {/* ---- Error handling ---- */}
              {errors.name?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Category of course is required</p>
              )}
            </div>
            <div className='flex flex-col items-start'>
              <label for="last_name" class="block mb-2 text-md font-semibold text-gray-800 ">Description</label>
              <textarea
                type="text"
                name='description'
                rows={3}
                class="bg-gray-50 row-6 border border-gray-300 text-blue-800  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-md" placeholder="Description"
                {...register("description", {
                  required: { value:true, message: 'Description  is reuired' }
                })}
              />
              {/* ---- Error handling ---- */}
              {errors.description?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Description of category is required</p>
              )}
            </div>

            {/* Related image Input */}
            <div className="mb-10">

              <label className="block text-sm font-medium text-gray-700 mb-2">Related Image</label>
              <div className="mt-1 w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload Image</span>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="sr-only"
                        {...register("relatedImage", {
                          required: { value: relatedImage===''?true:false, message: 'Images  is reuired' }
                        }
                        )}
                        onChange={(e)=>handleImageUpload(e)}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, WEBP
                  </p>
                </div>
              </div>

              {errors.relatedImage &&  relatedImage==='' && <p className="text-red-500 text-sm">{errors.relatedImage.message}</p>}
          
             {relatedImage && 
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
               
                  <div  className="relative">
                    <img
                      src={!isURL?URL.createObjectURL(relatedImage): relatedImage}
                      alt={`Preview`}
                      className="h-24 w-24 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <RxCross2 className="h-4 w-4" />
                    </button>
                  </div>
              </div>
             }
            </div>

            <div className="modal-action flex justify-end items-center gap-x-5">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  disabled={fetching}
                  onClick={() => document.getElementById('my_modal_1').close()}
                  data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 disabled:cursor-not-allowed">cancel</button>
              </form>
              <div>
                <button
                  disabled={fetching}
                  type='submit'
                  class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-gray-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center disabled:cursor-not-allowed">
                  {fetching ?
                    <LoadingBtn working={'Saving..'} /> :
                    'Save'
                  }
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}
