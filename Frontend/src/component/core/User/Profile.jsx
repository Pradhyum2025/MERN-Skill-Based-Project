import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiCheck, } from "react-icons/fi";
import { MdEditNote, MdMarkEmailRead, MdOutlinePhone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ChangeProfilePicture from "./ChangeProfilePicture.jsx";
import { FaAngleLeft } from "react-icons/fa";
import { getMyAccountDetails, updateProfileDetails } from "../../../operations/profile.js";
import { AiTwotoneShop } from "react-icons/ai";
import { GiRotaryPhone } from "react-icons/gi";
import { FaAddressCard } from "react-icons/fa6";
import CreateAddressModal from "../Address/CreateAddressModal.jsx";
import AdderessCart from "../order/AdderessCart.jsx";
import { getMyAddresses } from "../../../operations/Address.js";
import LoadingBtn from "../../common/LoadingBtn.jsx";


export const MyProfile = () => {
  const [newFetching, setNewFetching] = useState(false)
  const currUser = useSelector(store => store.auth);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currUser.token) {
      getMyAccountDetails(dispatch, currUser.token);
    }
    if (currUser.token && (currUser.accountType === 'Seller' || currUser.accountType === 'Buyer')) {
      getMyAddresses(dispatch, currUser.token)
    }
  }, [])

  const userData = {
    firstName: currUser?.firstName,
    lastName: currUser?.lastName,
    email: currUser?.email,
    contact: currUser?.contact,
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: userData
  });

  const onSubmit = async (data) => {

    if (currUser.token) {
      updateProfileDetails(dispatch, data, currUser.token, setIsEditing, setNewFetching)
    } else {
      return;
    }
  };

  const handleCancel = () => {
    setIsEditing(false);

  };

  const fetching = useSelector(store => store.fetching)
  const myAddresses = useSelector(store => store.addresses);

  if (fetching) {
    return <div className="min-h-[25rem] bg-background p-6 flex items-center justify-center w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
  }

  return (
    <div className={`min-h-screen bg-gray-100 p-2  w-full sm:pt-3  ${currUser.accountType === 'Buyer' ? 'mt-[4rem]' : null}`}>
      <div className="max-w-5xl mx-auto space-y-8">
        {!isEditing ? (
          <div className="">
            <h2 className="text-lg sm:text-left text-center font-heading text-gray-500 font-semibold mb-2">{currUser?.accountType && currUser?.accountType.toUpperCase()} ACCOUNT</h2>

            <div className="space-y-4 bg-white  p-3 sm:p-6 rounded-lg shadow-sm flex  flex-col gap-5">
              {/* Personal Informations */}
              <div>
                <div className="flex items-center justify-between gap-y-3 sm:items-center sm:justify-start sm:justify-between relative">

                  <p className='text-gray-600 font-md font-semibold flex justify-start items-center gap-3 w-full '>
                    <span className="hidden sm:flex"> {currUser?.accountType} ID : </span>
                    <span className='bg-blue-100 text-blue-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm'>#{currUser?._id}</span></p>

                  {/* Edit btn */}
                  <button
                    onClick={() => setIsEditing(() => true)}
                    className="btn min-h-[2rem] h-[2.2rem] bg-gray-100 px-3 border-1 border-gray-200 hover:border-gray-300  hover:bg-gray-200  text-black disabled:text-gray-600 font-[900]  "
                  > <span className="text-blue-600 sm:block hidden">Edit</span>
                    <MdEditNote size={25} className="text-blue-600" />
                  </button>

                </div>

                <div className='flex sm:items-center gap-y-5 sm:gap-7 flex-col sm:flex-row mt-2'>
                  {/* Image */}
                  <div className="flex items-center gap-3">

                    <div className="rounded-full">
                      <img src={currUser?.image} className="w-[3rem] h-[3rem] rounded-[30px] " alt="User image" />
                    </div>

                    {/* FullName */}
                    <span className="text-gray-500  text-lg font-semibold ">
                      {currUser?.firstName + " " + currUser?.lastName}
                    </span>
                  </div>
                  {/* Email */}
                  <p
                    className="text-gray-500  text-sm font-semibold flex items-center gap-1">
                    <MdMarkEmailRead className='text-blue-600 text-2xl' />{currUser?.email}
                  </p>
                  {/* COnatct */}
                  <p className="text-gray-600  text-sm font-bold flex items-center gap-1">
                    <MdOutlinePhone className='text-blue-600 text-xl' />{currUser?.contact}
                  </p>
                </div>
              </div>

              {/* Shop details */}
              {currUser.accountType === 'Seller' &&
                <div className="flex flex-col gap-3">
                  <p className='text-gray-600 fonr-md font-bold'>Company / Store / Shop Details :</p>
                  <div className='flex items-center gap-2'>
                    <p className="text-blue-600  text-2xl  font-semibold"><AiTwotoneShop /></p>
                    <p className="text-gray-500  text-sm  font-semibold">{currUser?.sellerDetails?.companyName}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <p className="text-gray-600  text-sm font-semibold"><GiRotaryPhone className='text-blue-500  text-2xl  font-semibold' /></p>
                    {currUser?.sellerDetails?.contact?.map(cont => (
                      <p className="text-gray-500   text-sm font-semibold">{cont}</p>
                    ))}

                  </div>

                </div>
              }

              {/* Address section */}
              {(currUser.accountType === 'Seller' || currUser.accountType === 'Buyer') &&
                <div className="flex flex-col gap-y-4">
                  <p className="flex items-center gap-2 ">
                    <FaAddressCard className="text-blue-500  text-xl  font-semibold" />
                    <span className="text-gray-500   text-sm font-semibold"> Address</span>
                  </p>

                  Addresses
                  <div className={`w-full ${newFetching ? 'relative opacity-75 ' : 'block'}`}>
                    {/* Loader */}
                    <div className={`${newFetching ? 'absolute flex items-center justify-center h-full w-full ' : 'hidden'}`}>

                      <button
                        disabled={newFetching}
                        className='class="px-4 py-3 w-[30%] border border-gray-300 flex  gap-2 items-center justify-center bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold disabled:cursor-not-allowed z-20 ">'
                      >
                        <div role="status">
                          <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                          </svg>

                          <span class="sr-only">Loading...</span>

                        </div>
                        <span className='text-xl font-bold'>
                          Loading

                        </span>

                      </button>

                    </div>
                    {myAddresses && myAddresses.map(address => {
                      return <AdderessCart key={address._id} address={address} setFetching={setNewFetching} />

                    })}

                  </div>

                  {myAddresses.length < 3 &&
                    <div className='w-full flex items-center justify-end p-2'>
                      <button
                        onClick={() => document.getElementById('my_modal_1').showModal()}
                        className='px-4 py-2 w-[2 5%] border-2 border-dashed border-blue-500  flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold text-md'>
                        NEW ADDRESS
                      </button>
                    </div>
                  }
                </div>
              }
            </div>
          </div>

        ) : (
          // ---------------- Edit options  ----------------
          <div className="w-full">

            <button
              disabled={fetching}
              className="btn min-h-[2rem] h-[2.5rem] bg-gray-100 border-1 border-gray-200 hover:border-gray-300  hover:bg-gray-200  text-black disabled:text-gray-600 mt-8 "
              onClick={() => setIsEditing(() => false)}> <FaAngleLeft />
              Back
            </button>

            <div className="w-full flex items-start flex-wrap sm:flex-nowrap justify-around gap-4 mt-2 mb-4 md:my-5">
              {/* -------------- Change profile image form -------------- */}
              <ChangeProfilePicture />

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col justify-center md:gap-y-10 gap-y-5  sm:pt-5">

                {/* ---------- edit image section ---------- */}

                {/* --------------- Text details  --------------- */}
                <div className="flex flex-col gap-y-8">

                  <div className="flex w-full  justify-around">
                    {/* ---------- First name ---------- */}
                    <div className="w-[45%]">
                      <label className="block text-sm font-[600] text-blue-600 mb-1">
                        FirstName
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="w-full px-3 py-2 text-sm font-bold border rounded-lg focus:ring-2 outline-0 focus:ring-blue-300 focus:border-transparent text-gray-800  font-[500] bg-white"
                        {...register("firstName", {
                          required: "first name is required",
                          minLength: {
                            value: 5,
                            message: "Section name must be at least 3 characters"
                          },
                          maxLength: {
                            value: 20,
                            message: "Section name cannot exceed 50 characters"
                          },
                        })}
                      />
                      {errors.firstName && (
                        <p
                          id="section-name-error"
                          className="mt-2 text-sm text-red-600 animate-fade-in"
                          role="alert"
                        >
                          {errors?.firstName?.message}
                        </p>
                      )}
                    </div>
                    {/* ---------- Last name----------  */}
                    <div className="w-[45%]">
                      <label className="block text-sm font-[600] text-blue-600 mb-1">
                        LastName
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="w-full px-3 py-2 text-sm font-bold border rounded-lg focus:ring-2 outline-0 focus:ring-blue-300 focus:border-transparent text-gray-800  font-[500] bg-white"
                        {...register("lastName", {
                          required: "Last name is required",
                          minLength: {
                            value: 5,
                            message: "Section name must be at least 3 characters"
                          },
                          maxLength: {
                            value: 20,
                            message: "Section name cannot exceed 50 characters"
                          },
                        })}
                      />
                      {errors.sectionName && (
                        <p
                          id="section-name-error"
                          className="mt-2 text-sm text-red-600 animate-fade-in"
                          role="alert"
                        >
                          {errors?.lastName?.message}
                        </p>
                      )}

                    </div>
                  </div>

                  <div className="flex w-full justify-around">
                    {/*  ------------- Email  -------------  */}
                    <div className="w-[45%]">
                      <label className="block text-sm font-[600] text-blue-600 mb-1">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        className="w-full px-3 py-2 text-sm font-bold border rounded-lg focus:ring-2 outline-0 focus:ring-blue-300 focus:border-transparent text-gray-800  font-[500] bg-white"
                        {...register("email", {
                          required: "Email is required",
                          minLength: {
                            value: 12,
                            message: "Email must be at least 12 characters"
                          },
                          maxLength: {
                            value: 100,
                            message: "Email cannot exceed 100 characters"
                          },
                        })}
                      />
                      {errors.email && (
                        <p
                          id="section-name-error"
                          className="mt-2 text-sm text-red-600 animate-fade-in"
                          role="alert"
                        >
                          {errors?.email?.message}
                        </p>
                      )}
                    </div>
                    {/*  ------------- contact -------------  */}
                    <div className="w-[45%]">
                      <label className="block text-sm font-[600] text-blue-600 mb-1">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="contact"
                        className="w-full px-3 py-2 text-sm font-bold border rounded-lg focus:ring-2 outline-0 focus:ring-blue-300 focus:border-transparent text-gray-800  font-[500] bg-white"
                        {...register("contact", {
                          required: "Contact is required",
                          minLength: {
                            value: 10,
                            message: "Contact number must be at least 10 characters"
                          },
                          maxLength: {
                            value: 10,
                            message: "Contact number cannot exceed 10 characters"
                          },
                        })}
                      />
                      {errors.contact && (
                        <p
                          id="section-name-error"
                          className="mt-2 text-sm text-red-600 animate-fade-in"
                          role="alert"
                        >
                          {errors?.contact?.message}
                        </p>
                      )}
                    </div>
                  </div>


                </div>

                <div className="flex justify-end gap-4 px-1">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="md:px-6 px-2 h-[2.3rem] py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <FiX /> Cancel
                  </button>
                  <button
                    disabled={newFetching}
                    type="submit"
                    className="md:px-3 h-[2.3rem]  px-2 py-0 text-md bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center  disabled:opacity-50 disabled:cursor-not-allowed"
                  >

                    {newFetching ?
                      <LoadingBtn working={'Saving...'} /> :
                      <span className="flex items-center gap-2 text-md">
                        <FiCheck /> Save Changes
                      </span>
                    }
                  </button>
                </div>

              </form>

            </div>

          </div>
        )}
      </div>
      <CreateAddressModal />
    </div>
  );
};

