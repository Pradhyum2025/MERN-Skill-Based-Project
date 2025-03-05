import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../../operations/category';
import LoadingBtn from '../../common/LoadingBtn';
import { RxCross2 } from 'react-icons/rx';
import { FiUploadCloud } from 'react-icons/fi';


export default function EditModal({ category }) {
  const currUser = useSelector(store => store.auth);
  const [fetching, setFetching] = useState(false)
  const dispatch = useDispatch();
  const [productBrands, setProductBrands] = useState([]);
  const [relatedImage, setrRelatedImage] = useState('');
  const [isURL, setIsURL] = useState(true);


  const {
    register,
    handleSubmit,
    reset, // Used to update form fields with existing data
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (category) {
      reset({ name: category.name, description: category.description, startingPrice: category.startingPrice });
      setProductBrands(category?.relativeBrands)
      setrRelatedImage(category?.relatedImage)
      setIsURL(true);
    }
  }, [category, reset])

  const onSubmit = async (data) => {
    data.relativeBrands = productBrands;

    if (currUser.token) {
      try {
        await updateCategory(dispatch, category._id, data, currUser.token, setFetching);
      } catch (error) {
        console.log(error)
      }
    } else {
      return;
    }
  }


  const handleImageUpload = (e) => {
    setIsURL(false);
    return setrRelatedImage(() => e.target.files[0]);
  };

  const removeImage = () => {
    return setrRelatedImage("");
  };

  const handleBrands = (e) => {
    e.preventDefault();
    if (e.target.value !== '') {
      const newEntry = e.target.value;
      setProductBrands((prev) => [...prev, newEntry.trim()]);
      e.target.value = '';
    }

  }

  const handleRemovalOfBrands = (indx) => {
    setProductBrands(() => productBrands.filter((_, index) => index !== indx))
  }

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-slate-100 pt-2">
          <h1
            className='w-full text-center text-gray-500 text-[1.2rem] font-bold my-2'>
            UPDATE CATEGORY DETAILS</h1>

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
            {/*  ----------------- Name -----------------  */}
            <div className='flex flex-col items-start mb-2 '>
              <label for="first_name" class="block mb-2 text-sm font-semibold text-gray-800 ">Name</label>
              <input
                type="text"
                name='name'
                class="bg-gray-50 border border-gray-300 text-blue-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-bold" placeholder="Name"
                {...register("name", {
                  required: { value: true, message: 'Name  is reuired' }
                })}
              />
              {/* ---- Error handling ---- */}
              {errors.name?.type === "required" && (
                <p role="alert" className='text-xs text-red-500'>Category of course is required</p>
              )}
            </div>

            {/*startingPrice  */}
            <div>
              <label htmlFor="startingPrice" className="block mb-2 text-sm font-semibold text-gray-800 ">
                Starting price  <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="startingPrice"
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-0 focus:ring-blue-500 text-blue-800 text-sm font-bold  focus:border-blue-500 bg-white outline-0 ${errors?.startingPrice ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter starting price or estimated staring price"
                {...register("startingPrice", { required: true, min: 0 })}
              />
              {/* ---- Error handling ---- */}
              {errors.startingPrice?.type === "required" && (
                <p role="alert" className='text-xs text-red-500'>Starting price is requires</p>
              )}
            </div>

            {/* -----------------  Description -----------------  */}
            <div className='flex flex-col items-start'>
              <label for="last_name" class="block mb-2 text-sm font-semibold text-gray-800 ">Description</label>
              <textarea
                type="text"
                name='description'
                rows={3}
                class="bg-gray-50 row-6 border border-gray-300 text-blue-800  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-bold text-sm" placeholder="Description"
                {...register("description", {
                  required: { value: true, message: 'Description  is reuired' }
                })}
              />
              {/* ---- Error handling ---- */}
              {errors.description?.type === "required" && (
                <p role="alert" className='text-xs text-red-500'>Description of category is required</p>
              )}
            </div>


            {/* ------------  Brands ------------  */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-semibold text-gray-800 ">Relative brands of category</label>
              <input
                name="relativeBrands"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleBrands(e);
                  }
                }}
                {...register("relativeBrands", {

                  required: { value: productBrands.length === 0 ? true : false, message: 'Relative Brands is reuired' }
                }
                )}
                rows="4"
                className={`block p-2.5 w-full text-blue-800 text-sm font-bold  bg-gray-50 rounded-lg border border-gray-300 outline-0 focus:ring-primary-500 focus:border-primary-500 ${errors.name ? "border-red-500" : "border-gray-300"} `}
                placeholder="Press enter to add brands "
              />

              {errors?.relativeBrands && <p className="text-red-500 text-xs">{errors?.relativeBrands?.message}</p>}

              <div className="flex gap-2 mt-2 flex-wrap">
                {productBrands.map((brand, indx) => {
                  return <span key={indx} class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-1 py-0.5 rounded-sm flex items-center justify-between gap-x-2" >{brand}<RxCross2
                    onClick={() => handleRemovalOfBrands(indx)}
                    className="cursor-pointer hover:bg-gray-300 rounded"
                  /></span>
                })}
              </div>
            </div>


            {/*  ----------------- Related image Input -----------------  */}
            <div className="my-4">
              <label for="last_name" class="block mb-2 text-sm font-semibold text-gray-800 ">Related Image</label>
              <div className="mt-1 w-full flex justify-center px-6 py-2 border-2 border-gray-300 border-dashed rounded-md">
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
                          required: { value: relatedImage === '' ? true : false, message: 'Images  is reuired' }
                        }
                        )}
                        onChange={(e) => handleImageUpload(e)}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, WEBP
                  </p>
                </div>
              </div>

              {errors.relatedImage && relatedImage === '' && <p className="text-red-500 text-xs">{errors.relatedImage.message}</p>}

              {relatedImage &&
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">

                  <div className="relative">
                    <img
                      src={!isURL ? URL.createObjectURL(relatedImage) : relatedImage}
                      alt={`Preview`}
                      className="h-[9rem] w-[15rem] object-fill rounded-lg"
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

            {/* ----------------- Related image Preview ----------------- */}
            <div className="modal-action flex justify-end items-center gap-x-5">

              <form method="dialog">
                {/* --------- it will close the modal ----------  */}
                <button
                  disabled={fetching}
                  onClick={() => document.getElementById('my_modal_1').close()}
                  data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm  text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 font-[800] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed">Cancel</button>
              </form>
              <div>
                <button
                  disabled={fetching}
                  type='submit'
                  class="text-gray-200 bg-blue-600 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300 font-[800] rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center disabled:cursor-not-allowed">
                  {fetching ?
                    <LoadingBtn working={'Saving..'} /> :
                    'Save changes'
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
