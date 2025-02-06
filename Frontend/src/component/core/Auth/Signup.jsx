import React from 'react'
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import LoadingBtn from '../../common/LoadingBtn';
import  { signUp } from '../../../operations/auth';
import toast from 'react-hot-toast';

export default function Signup() {

  //nvaigate
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const location = useLocation();
 
  //React form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
   console.log(data)
   if(data.confirmPassword!==data.password){
    return toast.error('Password not match!')
   }
   event.preventDefault();

    //User details
    let signUpData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contact:data.contact,
      password: data.password,
    }
   
    return await signUp(navigate,dispatch,signUpData);
  }
  
  const handleNavigateLogin =()=>{
    navigate('/');
    return document.getElementById('my_modal_3').showModal()
  }

  //Fetching 
  let fetching = useSelector(store => store.fetching);

  return (
    <div class="bg-white py-10">
      {/*--------- Signup Heading--------- */}
      <div class="text-center bg-gradient-to-r from-blue-500 to-blue-900 min-h-[160px] sm:p-6 p-4 mt-10">
      <h4 class="sm:text-3xl text-2xl text-white  tracking-wider  font-bold">Create your free account</h4>
      </div>

      <div class="font-Inter mx-4 mb-4 -mt-16">

        {/* -----------------------------form starting-------------------------- */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          class="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">


          <div class="grid md:grid-cols-2 gap-8">
            {/* ----------------first name---------------- */}
            <div>
              <label class="text-gray-800 text-sm mb-2 block">First Name <span className='text-red-500'>*</span></label>
              <input name="firstName" type="text" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter name"
                // --------validation--------
                {...register("firstName", { required: true, 
                  maxLength: { value: 100, message: "First name length should be under 100 word" },
                })}
              />
              {/* -------Error handling ------- */}
              {errors.firstName?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>First name is required</p>
              )}
              <p className='text-[.81rem] text-red-500'>{errors?.firstName?.message}</p>
            </div>


            {/* ----------------Last name---------------- */}
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Last Name<span className='text-red-500'>*</span></label>
              <input name="lastName" type="text" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter last name"
                // ---- validation -------
                {...register("lastName", { required: true, 
                  maxLength : { value: 100, message: "Last name length should be under 100 word" },
                 })}
              />
              {/* ---- Error handling ---- */}
              {errors.lastName?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Last name is required</p>
              )}
               <p className='text-[.81rem] text-red-500'>{errors?.lastName?.message}</p>
            </div>


            {/* ----------------Email id---------------- */}
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Email Id<span className='text-red-500'>*</span></label>
              <input name="email" type="email" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter email"
                // ---- validation -------
                {...register("email",
                  {
                    required: true,
                    maxLength: { value: 300, message: "EmailId length should be under 200 word" },
                    minLength: { value: 12, message: 'EmailId length should be grater than 12 words' }
                  })}
              />
              {/* ---- Error handling ---- */}
              {errors.email?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Email id is required</p>
              )}
              <p className='text-[.81rem] text-red-500'>{errors?.email?.message}</p>
            </div>

            <div>
              <label class="text-gray-800 text-sm mb-2 block">Mobile No.<span className='text-red-500'>*</span></label>
              <input name="contact" type="number" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter mobile number"
                // ---- validation -------
                {...register("contact", {
                  required: true,
                  maxLength: { value: 10, message: "Enter valid contact number" },
                  maxLength: { value: 10, message: 'Enter valid contact number' }
                })}
              />
              {/* ---- Error handling ---- */}
              {errors.contact?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Contact number is required</p>
              )}
              <p className='text-[.81rem] text-red-500'>{errors?.contact?.message}</p>
            </div>


            {/* ---------------- Password---------------- */}
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Password<span className='text-red-500'>*</span></label>
              <input name="password" type="password" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter password"
                // ---- validation -------
                {...register("password", { required: true,
                  minLength: { value: 8, message: 'Minimum length of password should be 8' },
                  maxLength: { value: 10, message: 'Minimum length of password should be 50' }
                 })}
              />
              {/* ---- Error handling ---- */}
              {errors.password?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Password is required</p>
              )}
               <p className='text-[.81rem] text-red-500'>{errors?.password?.message}</p>
            </div>

            {/* ----------------Confirm password---------------- */}
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Confirm Password<span className='text-red-500'>*</span></label>
              <input name="confirmPassword" type="password" class="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter confirm password"
                // ---- validation -------
                {...register("confirmPassword", { required: true,
                  minLength: { value: 8, message: 'Minimum length of password should be 8' },
                  maxLengthLength: { value: 10, message: 'Maximum length of password should be 50' }

                 })}
              />
              {/* ---- Error handling ---- */}
              {errors.confirmPassword?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Confirm password didn't match</p>
              )}
              <p className='text-[.81rem] text-red-500'>{errors?.confirmPassword?.message}</p>
            </div>


            {/* -------- additional inputs for instructor roll ---------- */}
          </div>

          {/* ----------submit button----------- */}
          <div class="mt-8 flex justify-between items-center">
            <button type="submit" class="btn py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none border-none">
            {fetching ?
              <LoadingBtn working={'Signing'} /> :
                'Signup'
              }
              </button>
         
              <p class="text-sm font-semibold text-gray-500 ">
                       Alredy have an account? <span 
                       onClick={handleNavigateLogin}
                       class="font-medium text-primary-600 hover:underline text-primary-500 hover:text-blue-500 cursor-pointer">Sign in</span>
                    </p>

          </div>

          {/* -------------- Break line-------------- */}

        </form> {/* ---------------form ending--------------- */}

      </div>
    </div>
  )
}
