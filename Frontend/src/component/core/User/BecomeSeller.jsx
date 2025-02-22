import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import LoadingBtn from "../../common/LoadingBtn";
import { useDispatch, useSelector } from "react-redux";
import { becomeSeller } from "../../../operations/auth";
import { useNavigate } from "react-router-dom";


export default function BecomeSeller() {

  const currUser = useSelector(store=>store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const onSubmit = async (data) => {
    if(currUser.token && currUser.accountType==='Buyer'){
      return await becomeSeller(navigate,dispatch,data,currUser.token)
    }else{
    if(currUser.accountType==='Seller'){
      
      toast("You are already registerd as a seller", {
        icon: "⚠️",
        style: {
          background: "rgb(160 141 93)", // Yellow color for warning
          color: "rgb(255 255 255)",
        },
      });
    }else{
      return document.getElementById('my_modal_3').showModal()
    }
  }
  }

  const fetching = useSelector(store=>store.fetching);
  return (
    <div className="bg-white w-full h-full mt-[4rem] pt-5">

      <div className="border-b border-gray-900/10 pb-12 bg-white mx-10 md:mx-20 lg:mx-40">
        {/* seller information */}
        <h2 className="text-[#ecba3d] text-[1.7rem]  mb-5 font-semibold w-full text-center">Register yourself here as a seller</h2>
        <h2 className="text-[1.2rem] mt-5 font-semibold text-blue-700">Company/Store/Shop information</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">

          {/* companyName */}
          <div className="sm:col-span-3">
            <label for="companyName" className="block text-sm/6 font-medium text-gray-900">Shop/store/Company name</label>
            <div className="mt-2">
              <input type="text" name="companyName" id="companyName" autocomplete="given-name" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"

                {...register("companyName", {
                  required: { value: true, message: "Company / store /shop is required" },
                  maxLength: { value: 50, message: 'maximum length is 50' },
                  minLength: { value: 10, message: 'Minimum length is 10' }
                }
                )}
              />
              {errors?.companyName && <p className="text-red-500 text-sm">{errors?.companyName?.message}</p>}
            </div>

          </div>

          {/* contact number*/}
          <div className="sm:col-span-3">
            <label for="contact" className="block text-sm/6 font-medium text-gray-900">Contact number</label>
            <div className="mt-2">
              <input type="number" name="contact" id="contact" autocomplete="family-name" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                {...register("contact", {
                  required: { value: true, message: "Contact is required" },
                  maxLength: { value: 10, message: 'maximum length is 50' },
                  minLength: { value: 10, message: 'Minimum length is 10' }
                }
                )}
              />
              {errors?.contact && <p className="text-red-500 text-sm">{errors?.contact?.message}</p>}
            </div>
          </div>

          {/* store description */}
          <div className="sm:col-span-4">
            <label for="about" className="block text-sm/6 font-medium text-gray-900">About store </label>
            <div className="mt-2">
              <textarea id="about"
                name="description"
                rows={3}
                type="text" autocomplete="about" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                {...register("about", {
                  required: { value: true, message: "Description is required" },
                  maxLength: { value: 300, message: 'maximum length is 300' },
                  minLength: { value: 100, message: 'Minimum length is 100' }
                }
                )}
              />
              {errors?.about && <p className="text-red-500 text-sm">{errors?.about?.message}</p>}

            </div>
          </div>
    
          <div className="col-span-full">
          <h2 className="text-[1.2rem] my-5 font-semibold text-blue-700">Shipping address details</h2>
          </div>

          {/* country */}
          <div className="sm:col-span-3 mb-6">
            <label for="country" className="block text-sm/6 font-medium text-gray-900">Country</label>
            <div className="mt-0">
              <select 
              id="country" 
              name="country"
                autocomplete="country-name" className="font-[500] bg-white block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6 text-gray-800"

                {...register("country", {
                  required: { value: true, message: "Country is required" },
                }
                )}
              >
                <option value={''} >Select country</option>
                <option value={'india'} >India</option>
              </select>
              {errors?.country && <p className="text-red-500 text-sm">{errors?.country?.message}</p>}
            </div>
          </div>

            {/* Landmark */}
            <div className="sm:col-span-3">
            <label for="landMark" className="block text-sm/6 font-medium text-gray-900">Landmark</label>
           
              <input type="text" name="landMark" id="state" autocomplete="address-level1" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"

               {...register("landMark", {
                required: { value: true, message: "landMark is required" },

              }
              )}
            />
            {errors?.landMark && <p className="text-red-500 text-sm">{errors?.landMark?.message}</p>}
           
          </div>

          {/* streetAddress */}
          <div className="col-span-full">
            <label for="streetAddress" className="block text-sm/6 font-medium text-gray-900">streetAddress</label>
            <div className="mt-2">
              <textarea type="text"
                name="streetAddress"
                rows={4}
                id="streetAddress"
                autocomplete="address" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"

                {...register("streetAddress", {
                  required: { value: true, message: "Street address is required" },
                }
                )}
              />
              {errors?.streetAddress && <p className="text-red-500 text-sm">{errors?.streetAddress?.message}</p>}


            </div>
          </div>

          {/* city */}
          <div className="sm:col-span-2 sm:col-start-1">
            <label for="city" className="block text-sm/6 font-medium text-gray-900">City</label>
            <div className="mt-2">
              <input type="text" name="city" id="city" autocomplete="address-level2" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                {...register("city", {
                  required: { value: true, message: "City is required" },

                }
                )}
              />
              {errors?.city && <p className="text-red-500 text-sm">{errors?.city?.message}</p>}

            </div>
          </div>

          {/* State. */}
          <div className="sm:col-span-2">
            <label for="state" className="block text-sm/6 font-medium text-gray-900">State</label>
            <div className="mt-2">
              <input type="text" name="state" id="state" autocomplete="address-level1" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"

               {...register("state", {
                required: { value: true, message: "State is required" },

              }
              )}
            />
            {errors?.state && <p className="text-red-500 text-sm">{errors?.state?.message}</p>}
            </div>
          </div>


          {/* pincode */}
          <div className="sm:col-span-2">
            <label for="postalCode" className="block text-sm/6 font-medium text-gray-900">ZIP / Postal code</label>
            <div className="mt-2">
              <input type="text" name="postalCode" id="postalCode" autocomplete="postal-code" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                 {...register("postalCode", {
                  required: { value: true, message: "Pincode is required" },
                  maxLength: { value: 6, message: 'maximum length is 6' },
                  minLength: { value: 6, message: 'Minimum length is 6' }
                }
                )}
              />
              {errors?.postalCode && <p className="text-red-500 text-sm">{errors?.postalCode?.message}</p>}
            </div>
          </div>

            {/*  button */}
          <div className="sm:col-span-2 flex items-start gap-3 w-full mt-4">
            

            <button 
            type="submit"
            disabled={fetching}
             className="rounded-md bg-blue-600 px-3 py-2 w-[7rem] text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed">
              {fetching?
              <LoadingBtn working={'Saving...'}/>
              :'Submit'
              }
              </button>

            <button
             disabled={fetching}
             type="reset" className="rounded-md bg-gray-200 px-3 py-2 w-[7rem] text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:cursor-not-allowed">Reset</button>


          </div>

        </form>
      </div>
    </div>
  );
};

