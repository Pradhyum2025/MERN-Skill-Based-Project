import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


export default function BecomeSeller(){

  let token = localStorage.getItem('token');

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async(data) =>{
    console.log(data);
    const sellerInfo = {
      store_name:data.store_name,
      contact_number:data.contact,
      store_description:data.description,
      store_address:data.address,
      state:data.state,
      city:data.city,
      postalCode:data.postalCode,
      country:data.country,
      verified_status:data.verified_status, 
  }
   
  await axios.post('http://localhost:8080/user/seller',sellerInfo,{
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`, // Include token as a Bearer token
    },
  })
  .then((res)=>{
    if(res.data){
      toast.success(res.data.message)
      window.location.reload();
    }
  })
  .catch(err=>{
    if(err.response){
      toast.error(err.response.message);
    }
  })

}
  return (
    <div className="bg-white w-full h-full py-5">
    
    <div className="border-b border-gray-900/10 pb-12 bg-white mx-10 md:mx-20 lg:mx-40">
    {/* seller information */}
    <h2 className="text-[#ecba3d] text-[1.7rem] underline mb-5 font-semibold w-full text-center">Beacome a seller and sell your product here</h2>
        <h2 className="text-[1.2rem] mt-5 font-semibold text-blue-700">Seller Account Information</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

         {/* tittle */}
          <div className="sm:col-span-3">
            <label for="store_name" className="block text-sm/6 font-medium text-gray-900">Shop/store/Company name</label>
            <div className="mt-2">
              <input type="text" name="store_name" id="store_name" autocomplete="given-name" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              {...register("store_name", { required: true })}
              />
              <br />
              {errors.store_name && <span className='text-sm font-semibold text-red-500'>store name is required*</span>}
            </div>

          </div>

        {/* contact number*/}
          <div className="sm:col-span-3">
            <label for="contact" className="block text-sm/6 font-medium text-gray-900">Contact number</label>
            <div className="mt-2">
              <input type="number" name="contact" id="contact" autocomplete="family-name" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
               {...register("contact", { required: true })}
               />
               <br />
               {errors.contact && <span className='text-sm font-semibold text-red-500'>contact number is required*</span>}
            </div>
          </div>

          {/* store description */}
          <div className="sm:col-span-4">
            <label for="description" className="block text-sm/6 font-medium text-gray-900">Store description</label>
            <div className="mt-2">
              <textarea id="description" name="description" type="text" autocomplete="description" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            {...register("description", { required: true })} />
            <br/>
            {errors.description && <span className='text-sm font-semibold text-red-500'>description is required*</span>}

            </div>
          </div>

          {/* country */}
          <div className="sm:col-span-3">
            <label for="country" className="block text-sm/6 font-medium text-gray-900">Country</label>
            <div className="mt-2">
              <select id="country" name="country" 
              
              {...register("country", { required: true })}
              autocomplete="country-name" className="font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6">
                <option>India</option>
                <option>United States</option>
                <option>UK</option>
              </select>
            </div>
          </div>
            
            {/* address */}
          <div className="col-span-full">
            <label for="address" className="block text-sm/6 font-medium text-gray-900">Address</label>
            <div className="mt-2">
              <textarea type="text" name="address" id="address" autocomplete="address" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            {...register("address", { required: true })}/>
            <br/>
            {errors.address && <span className='text-sm font-semibold text-red-500'>address is required*</span>}
            </div>
          </div>
           
           {/* city */}
          <div className="sm:col-span-2 sm:col-start-1">
            <label for="city" className="block text-sm/6 font-medium text-gray-900">City</label>
            <div className="mt-2">
              <input type="text" name="city" id="city" autocomplete="address-level2" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
             {...register("city", { required: true })}/>
             <br/>
             {errors.city && <span className='text-sm font-semibold text-red-500'>city is required*</span>}
            </div>
          </div>
            
            {/* this.state. */}
          <div className="sm:col-span-2">
            <label for="state" className="block text-sm/6 font-medium text-gray-900">State</label>
            <div className="mt-2">
              <input type="text" name="state" id="state" autocomplete="address-level1" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              {...register("state", { required: true })}/>
              <br/>
              {errors.state && <span className='text-sm font-semibold text-red-500'>state is required*</span>}
            </div>
          </div>


         {/* pincode */}
          <div className="sm:col-span-2">
            <label for="postalCode" className="block text-sm/6 font-medium text-gray-900">ZIP / Postal code</label>
            <div className="mt-2">
              <input type="text" name="postalCode" id="postalCode" autocomplete="postal-code" className="px-3 font-[600] bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            {...register("postalCode", { required: true })}/>
            <br/>
            {errors.postalCode && <span className='text-sm font-semibold text-red-500'>postalCode is required*</span>}
            </div>
          </div>
           
           {/* varified status */}
          <div className="flex flex-col items-start w-full">
            <div className="flex items-center">
          <input
            type="checkbox"
            id="verified_status"
            name="verified_status"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            {...register("verified_status", { required: true })}/>
            <br/>
   
          <label htmlFor="verified_status" className="ml-2 block text-sm text-gray-700">
            Verified Status
          </label>
            </div>
          <br />
            {errors.verified_status && <span className='text-sm font-semibold text-red-500'>postalCode is required*</span>}

         {/* save button */}
          <div className="mt-10 flex items-center justify-start gap-x-6 w-full">
      <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 w-[10rem] text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </div>

        </div>

      </form>
      </div>
    </div>
  );
};

