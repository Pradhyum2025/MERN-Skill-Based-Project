import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBtn from '../../Common/LoadingBtn';
import { FaUserEdit } from "react-icons/fa";
import { updateProfileImage } from '../../../operations/profile';

export default function ChangeProfilePicture() {
  const currUser = useSelector(store => store.auth);

  let [picture,setPicture] = useState(currUser?.image)

  const dispatch = useDispatch();
 
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors }
    } = useForm({
    });
 
    // Choosen picture preview handler
    const handleInputChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPicture(reader.result); // Generate the preview
        };
        reader.readAsDataURL(file);
      }
    };
    
  const [fetching,setFetching] = useState(false);

  //Submit form
  const onSubmit = async (data) => {
    if (currUser && currUser?.token) {
      return updateProfileImage(dispatch,data,currUser.token,setFetching,setPicture);
    } else {
      return 
    }
  }
 
  // Hnadle Cancle
  const handleCancel = () => {
    if(currUser?.image!==picture){
      return setPicture(currUser?.image)
    }
    return ;
  };

  return (
    <form 
    onSubmit={handleSubmit(onSubmit)} className='mb-5 md:mt-0'>

    <div
      className="relative w-full h-full   pl-5 sm:pl-0 p  sm:mt-5">

      <div className="w-[7rem] h-[7rem]  sm:w-48 sm:h-48 rounded-full overflow-hidden">
        <img
          src={picture}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      <input
        type="file"
        name="picture"
        accept="image/*"
        className="border-4 border-red-500 w-[7rem] h-[7rem] sm:w-48 sm:h-48 absolute left-5 sm:left-0 inset-0 opacity-0 cursor-pointer bg-gray-100  h-[90%] p-14 flex justify-center items-center z-20"
        {...register("picture", {
          required: "picture is required",
        })}

        onChange={(event) => {
          handleInputChange(event); // Handle custom logic
        }}
      />
      <div
        className="w-[7rem]  h-[7rem] sm:w-48 sm:h-48 absolute left-5 sm:left-0 inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-100 hover:opacity-100 transition-opacity rounded-full p-2 z-10" >
        <FaUserEdit className="text-white" size={32} />
      </div>

    </div>
    {/* Buttons */}
    <div className='flex items-center gap-2 justify-around mt-5'>

    <button
    disabled={currUser?.image===picture}
     type="submit" className='btn min-h-[2rem] h-[2.2rem] bg-blue-600 border-0 hover:bg-indigo-700 text-white disabled:bg-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed'>
      {fetching?
      <LoadingBtn working={'Saving..'}/>:
      'Save'}
      </button>
  
    <button 
    type={'reset'}
    onClick={handleCancel}
    disabled={fetching}
    className='btn min-h-[2rem] h-[2.2rem] bg-gray-100 border-1 border-gray-200 hover:border-gray-300  hover:bg-gray-200  text-black disabled:text-gray-600'>Cancle
    </button>

    </div>
   
  </form>
  )
}
