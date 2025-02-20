import React, { useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { signIn } from '../../../operations/auth';


export default function Login() {

  let dispatch = useDispatch()
  const navigate = useNavigate();
  //useForm hook
  const { register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)

    return await signIn(navigate, dispatch, data);
  }

  const handleNavigateSignUp = () => {
    document.getElementById('my_modal_3').close();
    return navigate('/signup')
  }


  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box dark:bg-gray-800 text-black ">
          {/* if there is a button in form, it will close the modal */}
          <button className="absolute text-2xl text-gray-800 hover:text-gray-800 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 rounded  font-extrabold right-2 top-2"
            onClick={() => document.getElementById('my_modal_3').close()}
          ><RxCross2 /></button>

          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-800 border-0">
            <div class="p-6 space-y-4 md:space-y-6 w-full">

              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>

              <form
                onSubmit={handleSubmit(onSubmit)}
                class="space-y-4 md:space-y-6" action="#">
                {/* ----------------- Email ----------------- */}
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
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

                {/*--------------- Password --------------- */}
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                    {...register("password", {
                      required: true,
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



                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a href="#" class="text-sm font-medium text-blue-400 hover:underline ">Forgot password?</a>
                </div>
                <button type="submit" class="w-full text-white bg-yellow-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <span
                    onClick={handleNavigateSignUp}
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">Sign up</span>
                </p>
              </form>

            </div>

          </div>


        </div>

      </dialog>
    </div>
  )
}