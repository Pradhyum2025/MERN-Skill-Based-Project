import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../../operations/category';
import LoadingBtn from '../../Common/LoadingBtn';


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
      return;
    }
  }
  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-slate-100 pt-2">
          <h1 className='text-indigo-700 text-[1.5rem] font-bold mb-2'>Edit category</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col items-start mb-2'>
              <label for="first_name" class="block mb-2 text-md font-semibold text-gray-800 ">Name</label>
              <input
                type="text"
                name='name'
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Name" required
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
                rows={6}
                class="bg-gray-50 row-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Description" required
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
                  className="btn text-[1.05rem] hover:bg-gray-800 bg-black border-0 hover:shadow-xl" onClick={() => document.getElementById('my_modal_1').close()}>Cancle</button>
              </form>
              <div>
                <button
                  type='submit'
                  className='btn bg-indigo-700 text-[1.05rem] hover:bg-indigo-800 border-0 hover:shadow-xl'>
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
