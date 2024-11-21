import React, { useContext, useState } from 'react'
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { authSliceAction } from '../store/auth';

export default function Login() {

  let dispatch = useDispatch()
  const navigate = useNavigate();
  //useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async(data) =>{
    const userInfo = {
      email:data.email,
      password:data.password
  }
  await axios.post('http://localhost:8080/user/login',userInfo)
  .then((res)=>{
    console.log(res);
    if(res.data){
      document.getElementById('my_modal_3').close();
      localStorage.setItem('currUser',JSON.stringify(res.data.currUser));
      localStorage.setItem('token',JSON.stringify(res.data.token));
      dispatch(authSliceAction.initializeAuther(res.data.currUser));
      toast.success(res.data.message);
      navigate(+1);
    }
    
  })
  .catch((err)=>{
   if(err.response){
    toast.error(err.response.message);
   }
  });
  
}
  
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
  <div className="modal-box bg-white text-black ">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute  right-2 top-2"><ImCross/></button>
    </form>

     <form onSubmit={handleSubmit(onSubmit)}>

    {/* hard code data section */}
    <h3 className="text-[#ecba3d] font-bold text-2xl">Login</h3>

    {/* email */}
     <div className='mt-3'>
      <span className='font-bold'>Email</span>
      <br />
      <input type="email" placeholder='Enter your username' className='bg-white outline-none w-10/12  h-10 border-2 border-slate-700 py-1 px-2 rounded-md mt-1 font-semibold' 
       {...register("email", { required: true })}/>
       <br/>
        {errors.email && <span className='text-sm font-semibold text-red-500'>email is required*</span>}
     </div>
     
      {/* password */}
      <div className='mt-3'>
      <span className='font-bold'>password</span>
      <br />
      <input type="password" placeholder='Enter your password' className='bg-white outline-none w-10/12 h-10 border-2 border-slate-700 py-1 px-2 rounded-md mt-1 font-semibold'
       {...register("password", { required: true })}/>
       <br/>
        {errors.password && <span className='text-sm font-semibold text-red-500'>password is required*</span>}
     </div>
     <div>
      <p className='text-red-500 font-semi-bold mt-2'>{}</p>
     </div>

     {/* login btn */}
     <div className='mt-8 flex justify-between items-end'>
      <button className='btn min-h-10 h-10 bg-[#ecba3d] text-white border-none hover:'>Login</button>

      <p className='font-semibold mr-5'>Not registered?<span ><Link 
      className='text-blue-600 landing-7 hover:text-blue-800 hover:underline
      ' to="/signup" onClick={()=>document.getElementById('my_modal_3').close()}>SignUp</Link> </span>

      </p>
     </div>

  </form>

  </div>

</dialog>
    </div>
  )
}
