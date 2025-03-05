import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { postAddress } from "../../../operations/Address";
import LoadingBtn from "../../common/LoadingBtn";



export default function AddressForm({fetching,setFetching}) {
  const currUser = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];


  const onSubmit = async (data) => {
   if(currUser.token && (currUser.accountType==='Buyer' || currUser.accountType==='Seller')){
     return await postAddress(navigate,dispatch,data,currUser.token,setFetching)
   }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
        <p className="text-gray-500 font-[600] w-full text-center">NEW ADDRESS DETAILS</p>
        <hr/>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-0">

          {/*  ------- FirstName -------  */}
          <div>
            <label htmlFor="firstName" className="block text-[.82rem] font-semibold text-gray-600">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", {
                required: "First name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
                maxLength: { value: 50, message: "Maximum 50 characters" },
                pattern: { value: /^[A-Za-z]+$/, message: "Only alphabetic characters allowed" }
              })}
              className={`w-full text-sm text-black py-2 px-2 rounded-0 ring-[1px] outline-0 rounded  bg-white  mt-1 ${errors.firstName ? 'ring-red-500' : 'ring-blue-500'} `}
            />  
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-600">{errors.firstName?.message}</p>
            )}
          </div>

          {/*  ------- Last Name -------  */}
          <div>
            <label htmlFor="lastName" className="block text-[.82rem] font-semibold text-gray-600 ">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", {
                required: "Last name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
                maxLength: { value: 50, message: "Maximum 50 characters" },
                pattern: { value: /^[A-Za-z]+$/, message: "Only alphabetic characters allowed" }
              })}
              className={`w-full text-sm text-black py-2 px-2 rounded-0 ring-[1px] outline-0 rounded  bg-white  mt-1 ${errors.lastName ? 'ring-red-500' : 'ring-blue-500'} `}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          {/* -------------Conatct ------------- */}
          <div>
            <label htmlFor="contact" className="block text-[.82rem] font-semibold text-gray-600">
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              {...register("contact", {
                required: "Contact number is required",
                pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid Indian mobile number" }
              })}
              className={`w-full text-sm text-black py-2 px-2 rounded-0 ring-[1px] outline-0 rounded  bg-white  mt-1 ${errors.contact ? 'ring-red-500' : 'ring-blue-500'} `}
            />
            {errors.contact && (
              <p className="mt-1 text-xs text-red-600">{errors.contact.message}</p>
            )}
          </div>

          {/*  ------------ Alternative contact ------------  */}
          <div>
            <label htmlFor="alternateContact" className="block text-[.82rem] font-semibold text-gray-600 ">
              Alternate Contact
            </label>
            <input
              type="tel"
              id="alternateContact"
              {...register("alternateContact", {
                pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid Indian mobile number" },
                validate: value => !value || value !== watch("contact") || "Alternate contact must be different"
              })}
              className={`w-full text-sm text-black py-2 px-2 rounded-0 ring-[1px] outline-0 rounded  bg-white  mt-1 ${errors.alternateContact ? 'ring-red-500' : 'ring-blue-500'} `}
            />
            {errors.alternateContact && (
              <p className="mt-1 text-xs text-red-600">{errors.alternateContact.message}</p>
            )}
          </div>

          {/*  ------------  Street Address ------------  */}
          <div className="sm:col-span-2">
            <label htmlFor="streetAddress" className="block text-[.82rem] font-semibold text-gray-600">
              Street Address
            </label>
            <textarea
              id="streetAddress"
              {...register("streetAddress", {
                required: "Street address is required",
                minLength: { value: 50, message: "Minimum 50 characters" },
                maxLength: { value: 200, message: "Maximum 200 characters" }
              })}
              rows={3}
              className={`w-full text-sm text-black py-2 px-2 rounded-0 ring-[1px] outline-0 rounded  bg-white  mt-1 ${errors.streetAddress ? 'ring-red-500' : 'ring-blue-500'} `}
            />
            {errors.streetAddress && (
              <p className="mt-1 text-xs text-red-600">{errors.streetAddress.message}</p>
            )}
          </div>

          {/*  ------------ Landmark ------------  */}
          <div>
            <label htmlFor="landMark" className="block text-[.82rem] font-semibold text-gray-600">
              Landmark
            </label>
            <input
              type="text"
              id="landMark"
              {...register("landMark", {
                required: "Landmark is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 100, message: "Maximum 100 characters" }
              })}
              className={`w-full text-sm text-black py-2 px-2 rounded-0 ring-[1px] outline-0 rounded  bg-white  mt-1 ${errors.landMark ? 'ring-red-500' : 'ring-blue-500'} `}
            />
            {errors.landMark && (
              <p className="mt-1 text-xs text-red-600">{errors.landMark.message}</p>
            )}
          </div>

          {/* ------------  City ------------  */}
          <div>
            <label htmlFor="city" className="block text-[.82rem] font-semibold text-gray-600">
              City
            </label>
            <select
              id="city"
              {...register("city", { required: "City is required" })}
              className={`w-full text-sm text-black py-2 px-2 rounded-0 ring-[1px] outline-0 rounded  bg-white  mt-1 ${errors.city ? 'ring-red-500' : 'ring-blue-500'} `}
            >
              <option value="">Select a city</option>
              {["Goa"].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && (
              <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>
            )}
          </div>

          {/* ------------  State ------------  */}
          <div>
            <label htmlFor="state" className="block text-[.82rem] font-semibold text-gray-600">
              State
            </label>
            <select
              id="state"
              {...register("state", { required: "State is required" })}
              className={`w-full text-sm text-black py-2 px-2 rounded-0 ring-[1px] outline-0 rounded  bg-white  mt-1 ${errors.state ? 'ring-red-500' : 'ring-blue-500'} `}
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && (
              <p className="mt-1 text-xs text-red-600">{errors.state.message}</p>
            )}
          </div>

          {/* ------------   Postal Code  ------------  */}
          <div>
            <label htmlFor="postalCode" className="block text-[.82rem] font-semibold text-gray-600">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              {...register("postalCode", {
                required: "Postal code is required",
                pattern: { value: /^\d{6}$/, message: "Enter valid 6-digit postal code" }
              })}
              className={`w-full text-sm text-black py-2 px-2 rounded-0 ring-[1px] outline-0 rounded  bg-white  mt-1 ${errors.postalCode ? 'ring-red-500' : 'ring-blue-500'} `}
            />
            {errors.postalCode && (
              <p className="mt-1 text-xs text-red-600">{errors.postalCode.message}</p>
            )}
          </div>
          {/* -----------   Country ------------------- */}
          <div>
            <label htmlFor="country" className="block text-[.82rem] font-semibold text-gray-600">
              Country
            </label>
            <input
              type="text"
              id="country"
              value="India"
              readOnly
              className={`w-full text-sm text-black py-2 px-2 rounded-0 ring-[1px] outline-0 rounded  bg-white  mt-1 ${errors.country ? 'ring-red-500' : 'ring-blue-500'} `}
              {...register("country", {
                required: "Country code is required",
              })}
            />
          </div>

        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            disabled={fetching}
            onClick={() => reset()}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            Reset
          </button>
          <button
          disabled={fetching}
            type="submit"
            className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {fetching?
            <LoadingBtn working={'Submiting..'}/>
          :
            'Submit Address'
          }
          </button>
        </div>
      </form>
    </>
  );
};
