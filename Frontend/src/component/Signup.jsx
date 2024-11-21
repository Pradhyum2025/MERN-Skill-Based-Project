import React from 'react'
import { ImCross } from "react-icons/im";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { authSliceAction } from '../store/auth';


export default function Signup() {
  let dispatch = useDispatch();
  //navigation hook
  let Navigate = useNavigate();
  // useLocation route fetch the path before trying to access signup path
  let location =useLocation();
  const from  = location.state?.from?.pathname||'/';
  // console.log('from ',from)
  // Save the intended path before redirecting
  // const previespath =localStorage.getItem("redirectPath");
 

  const { register, handleSubmit, formState: { errors } } = useForm();

  //handle onsubmit
  const onSubmit = async(data) =>{
    const userInfo = {
      username:data.username,
      email:data.email,
      password:data.password
  }
  await axios.post('http://localhost:8080/user/signup',userInfo)
  .then((res)=>{
    if(res.data){
      console.log(res.data);
      toast.success('Signup Successfully!');
      localStorage.setItem('currUser',JSON.stringify(res.data.newUser));
      localStorage.setItem('token',JSON.stringify(res.data.token));
      dispatch(authSliceAction.initializeAuther(res.data.newUser));
      Navigate(from,{replace:true});
      window.location.reload();
    }
  })
  .catch((err)=>{
   if(err.response){
    toast.error(err.response.data.message);
   }
  });

};

  return (
    <div className="bg-neutral-400 w-full h-screen flex direction-col justify-center items-center dark:bg-slate-900">
      <Toaster />
      <div className="bg-white text-black border-2  py-6 px-10 rounded-lg shadow-2xl">

        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <Link to="/" className="btn btn-sm btn-circle btn-ghost relative left-80 bottom-4">
            <ImCross className='text-md' /> </Link>
        </form>
        
        <form  onSubmit={handleSubmit(onSubmit)}>
        {/* hard code data section */}
        <h3 className="text-[#ecba3d] font-bold text-2xl">SignUp</h3>

        {/* username */}
        <div className='mt-3'>

          <span className='font-bold'>Create Username</span>

          <br />

          <input 
          type="text" 
          placeholder='With numbers,alphabet,symbols' 
          className='bg-white outline-none w-80  h-10 border-2 border-slate-700 py-1 px-2 rounded-md mt-1 font-semibold'
          {...register("username", { required: true })}/>

          <br/>
          {errors.username && <span className='text-sm font-semibold text-red-500'>username is required*</span>}

        </div>


        {/* email */}
        <div className='mt-3'>

          <span className='font-bold'>Email</span>

          <br />

          <input type="email" placeholder='Enter your email' className='bg-white outline-none w-80  h-10 border-2 border-slate-700 py-1 px-2 rounded-md mt-1 font-semibold' 

           {...register("email", { required: true })}/>
           <br/>

           {errors.email && <span className='text-sm font-semibold text-red-500'>email is required*</span>}
        </div>



        {/* password */}
        <div className='mt-3'>

          <span className='font-bold'>Password</span>

          <br />

          <input type="password" placeholder='Create your password' className='bg-white outline-none w-80 h-10 border-2 border-slate-700 py-1 px-2 rounded-md mt-1 font-semibold' 

          {...register("password", { required: true })} />

          <br/>

           {errors.password && <span className='text-sm font-semibold text-red-500'>password is required*</span>}

        </div>


        {/* signup btn */}
        <div className='mt-12 flex justify-between items-end w-80'>
          <button type='submit'  className='btn min-h-10 h-10 bg-[#ecba3d] text-white border-none hover:bg-[#ecba3d]'>Sign-up</button>

          <p className='font-semibold mr-5'>already registered?
            <span >
              <Link
                className='text-blue-600 landing-7 hover:text-blue-800 hover:underline'
                // onClick={()=>document.getElementById('my_modal_3').showModal()}
                to='/'
              >login
              </Link>

            </span>
          </p>
        </div>

        </form>

      </div>

    </div>
  )
}
