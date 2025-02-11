import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../../operations/category';
import LoadingBtn from '../../common/LoadingBtn';


export default function EditModal({ category }) {

  const currUser = useSelector(store => store.auth);
  const fetching = useSelector(store => store.fetching)
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset, // Used to update form fields with existing data
    formState: { errors },
  } = useForm();

  // Pre-fill the form fields with existing data when the component mounts
  useEffect(() => {
    if (category) {
      reset(category)
    }
  }, [category, reset])

  const onSubmit = async (data) => {
    if (currUser.token) {
      try {
        await updateCategory(dispatch, data, currUser.token);
      } catch (error) {
        console.log(error)
      }
    } else {
      return ;
    }
  }
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
                class="bg-gray-50 border border-gray-300 text-blue-800 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Name" required
                {...register("name", { required: true, maxLength: 40 })}
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
                class="bg-gray-50 row-6 border border-gray-300 text-blue-800  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-md" placeholder="Description" required
                {...register("description", { required: true, maxLength: 500 })}
              />
              {/* ---- Error handling ---- */}
              {errors.description?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Description of category is required</p>
              )}
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
                  {fetching?
                   <LoadingBtn working={'Saving..'}/>:
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
