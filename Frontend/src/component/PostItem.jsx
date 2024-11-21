import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { redirect, useNavigate } from "react-router-dom";


export default function PostItem(){

  let token = localStorage.getItem('token');
  const navigate =useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async(data) =>{
    console.log(data);
    let productInfo = {
     nameWithModel:data.nameWithModel,
     price:data.price,
     features:data.features,
     image:data.image,
     catagory:data.catagory,
     warranty:data.warranty
    }

   
  let response = await axios.post('http://localhost:8080/listing',productInfo,{
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`, // Include token as a Bearer token
    },
  })
  if(response.data.success){
    toast.success(response.data.message)
     navigate('/profile')
  }else{
    toast.error(response.data.message);
  }
 
}
  return (
    <div className="bg-white w-full h-full pb-5 pt-2">
    <Toaster/>
    <div className="border-b border-gray-900/10 pb-12 bg-white mx-10 md:mx-20 lg:mx-40">
    {/* seller information */}
    <h3 className="text-[1.7rem] underline font-semibold text-[#ecba3d] w-full text-center mb-5">Sell Products</h3>

        <p className="text-[1.1rem] font-semibold text-blue-700 mt-5">Selling Product Information :</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

         {/* nameWithModel */}
          <div className="sm:col-span-3">
            <label for="nameWithModel" className="block text-sm/6 font-medium text-gray-900">Brand name with model of the product</label>
            <div className="mt-2">
              <input type="text" name="nameWithModel" id="nameWithModel" autocomplete="given-name" className="px-2  bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              {...register("nameWithModel", { required: true })}
              />
              <br />
              {errors.nameWithModel && <span className='text-sm font-semibold text-red-500'>nameWithModel  is required*</span>}
            </div>

          </div>

        {/* price*/}
          <div className="sm:col-span-3">
            <label for="price" className="block text-sm/6 font-medium text-gray-900">Product price &#40;in Rupees &#41;</label>
            <div className="mt-2">
              <input type="number" name="price" id="price" autocomplete="family-name" className="px-2   bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
               {...register("price", { required: true })}
               />
               <br />
               {errors.price && <span className='text-sm font-semibold text-red-500'>price is required*</span>}
            </div>
          </div>

          {/* features */}
          <div className="sm:col-span-4">
            <label for="features" className="block text-sm/6 font-medium text-gray-900">Features of the product</label>
            <div className="mt-2">
              <textarea id="features" name="features" type="text" autocomplete="features" className="px-2   bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            {...register("features", { required: true })} />
            <br/>
            {errors.features && <span className='text-sm font-semibold text-red-500'>Features of item is required*</span>}

            </div>
          </div>

          {/* Catagory*/}
          <div className="sm:col-span-3">
            <label for="catagory" className="block text-sm/6 font-medium text-gray-900">Catagory</label>
            <div className="mt-2">
              <select id="catagory" name="catagory" 
              {...register("catagory", { required: true })}
              autocomplete="catagory-name" className="px-2  bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6">
                <option>Smartphone</option>
                <option>Smartwatch</option>
                <option>SmartTv</option> 
                <option>VR</option> 
              </select>
            </div>
          </div>
            
            {/* image */}
          <div className="col-span-full">
            <label for="image" className="block text-sm/6 font-medium text-gray-900">Image</label>
            <div className="mt-2">
              <input type="text" placeholder="Enter image URL here" name="image" id="image" autocomplete="image" className="px-2  bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            {...register("image", { required: true })}/>
            <br/>
            {errors.image && <span className='text-sm font-semibold text-red-500'>image is required*</span>}
            </div>
          </div>
           
           {/* warranty */}
          <div className="sm:col-span-3 sm:col-start-1">
            <label for="warranty" className="block text-sm/6 font-medium text-gray-900">Warranty</label>
            <div className="mt-2">
              <input type="text" name="warranty" id="warranty" autocomplete="address-level2" className="px-2  bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
             {...register("warranty", { required: true })}/>
             <br/>
             {errors.warranty && <span className='text-sm font-semibold text-red-500'>warranty is required*</span>}
            </div>
           
         {/* save button */}
          <div className="mt-10 flex items-center justify-start gap-x-6 w-full">
      <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 w-[10rem] text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sell product  </button>
    </div>

          </div>
      </form>
      
      </div>
    </div>
  );
};

