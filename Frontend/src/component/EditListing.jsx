import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';


export default function EditListing() {

  let editListing = JSON.parse(localStorage.getItem('editListing'));
  console.log(editListing)
  let [nameWithModel,setNameWithModel] = useState("Hello");
  let [price,setPrice] = useState(editListing.price);
  let [features,setFeatures] = useState("32 MP camera 5000 mAh bettery");
  let [image,setImage] = useState(editListing.image);
  let [catagory,setCatagory] = useState(editListing.catagory);
  let [warranty,setWarranty] = useState(editListing.warranty);
  

  let handleNameWithModel = (event)=>{
    setNameWithModel(event.target.value)
  }

  const handlePrice = (event)=>{
    setPrice(event.target.value)
  }
  const handleFeatures = (event)=>{
    setFeatures(event.target.value)
  }
  const handleImage = (event)=>{
    setImage(event.target.value)
  }
  const handleCatagory = (event)=>{
    setCatagory(event.target.value)
  }
  const handleWarranty = (event)=>{
    setWarranty(event.target.value)
  }


  let product_id = editListing._id;
  let token = localStorage.getItem('token');
  const navigate =useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const HandleOnSubmit = async(event) =>{
    let productInfo = {
     nameWithModel:nameWithModel,
     price:price,
     features:features,
     image:image,
     catagory:catagory,
     warranty:warranty
    }
    event.preventDefault();
    console.log(productInfo);
   
  let response = await axios.patch(`http://localhost:8080/listing/${product_id}`,productInfo,{
    headers: {
      Authorization: `Bearer ${JSON.parse(token)}`, // Include token as a Bearer token
    },
  })
  if(response.data.success){
    console.log(response)
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
    <h3 className="text-[1.7rem] underline font-semibold text-[#ecba3d] w-full text-center mb-5">Edit Products Details</h3>

        <p className="text-[1.1rem] font-semibold text-blue-700 mt-5">Selling Product Information :</p>
        
        <form onSubmit={HandleOnSubmit} className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

         {/* nameWithModel */}
          <div className="sm:col-span-3">
            <label for="nameWithModel" className="block text-sm/6 font-medium text-gray-900">Brand name with model of the product</label>


            <div className="mt-2">
              <input 
              type="text" 
              value={nameWithModel}
              onChange={handleNameWithModel}
              name="nameWithModel" 
              id="nameWithModel" 
              autocomplete="given-name" 
              className="px-2  bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>

          </div>

        {/* price*/}
          <div className="sm:col-span-3">
            <label for="price" className="block text-sm/6 font-medium text-gray-900">Product price &#40;in Rupees &#41;</label>
            <div className="mt-2">
              <input 
              value={price}
              onChange={handlePrice}
              type="number" 
              name="price" 
              id="price" 
              autocomplete="family-name" 
              className="px-2   bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
               />

            </div>
          </div>

          {/* features */}
          <div 
          className="sm:col-span-4">
            <label for="features" className="block text-sm/6 font-medium text-gray-900">Features of the product</label>
            <div className="mt-2">
              <textarea 
             value={features}
             onChange={handleFeatures}
              id="features" 
              name="features"
              
              type="text" autocomplete="features" 
              className="px-2   bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
               />
            </div>
          </div>

          {/* Catagory*/}
          <div className="sm:col-span-3">
            <label for="catagory" className="block text-sm/6 font-medium text-gray-900">Catagory</label>
            <div className="mt-2">
              <select id="catagory" name="catagory" 
              autocomplete="catagory-name" className="px-2  bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6">
                <option>{editListing.catagory}</option>
                <option>smartphone</option>
                <option>smartwatch</option>
                <option>smarttv</option> 
                <option>Vr</option> 
              </select>
            </div>
          </div>
            
            {/* image */}
          <div className="col-span-full">
            <label for="image" className="block text-sm/6 font-medium text-gray-900">Image</label>
            <div className="mt-2">
              <input type="text"
             value={image}
             onChange={handleImage}
               placeholder="Enter image URL here" name="image" id="image" autocomplete="image" className="px-2  bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"/>
            </div>
          </div>
           
           {/* warranty */}
          <div className="sm:col-span-3 sm:col-start-1">
            <label for="warranty" className="block text-sm/6 font-medium text-gray-900">Warranty</label>
            <div className="mt-2">
              <input 
              value={warranty}
              onChange={setWarranty}
              type="text" 
              name="warranty" 
              id="warranty" autocomplete="address-level2" className="px-2  bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
           
         {/* save button */}
          <div className="mt-10 flex items-center justify-start gap-x-6 w-full">
      <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 w-[10rem] text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit</button>
    </div>

          </div>
      </form>
      
      </div>
    </div>
  )
}
