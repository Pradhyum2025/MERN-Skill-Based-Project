import { useEffect,  useState } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiCheck, } from "react-icons/fi";
import { MdEditNote, MdMarkEmailRead, MdOutlinePhone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import LoadingBtn from '../../Common/LoadingBtn.jsx'
import ChangeProfilePicture from "./ChangeProfilePicture.jsx";
import { FaAngleLeft } from "react-icons/fa";
import { getMyAccountDetails, updateProfileDetails } from "../../../operations/profile.js";
import { AiTwotoneShop } from "react-icons/ai";
import { GiRotaryPhone } from "react-icons/gi";
import { FaAddressCard } from "react-icons/fa6";
import CreateAddressModal from "../Address/CreateAddressModal.jsx";
import AdderessCart from "../order/AdderessCart.jsx";
import { getMyAddresses } from "../../../operations/Address.js";


export const MyProfile = () => {

  const currUser = useSelector(store => store.auth);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currUser.token) {
      getMyAccountDetails(dispatch, currUser.token);
    }
    if (currUser.token && (currUser.accountType==='Seller'|| currUser.accountType==='Buyer')) {
      getMyAddresses(dispatch, currUser.token)
    }
  },[])

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
      updateProfileDetails(dispatch, data, currUser.token, setIsEditing)
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
      return <div className="min-h-screen bg-background p-6 flex items-center justify-center w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    }

  return (
    <div className={`min-h-screen bg-gray-100 p-4 w-full ${currUser.accountType==='Buyer'?'mt-[4rem]':null}`}>
      <div className="max-w-5xl mx-auto space-y-8">
      {!isEditing ? (
        <div className="">
          <h2 className="text-lg font-heading text-gray-600 font-semibold mb-2">{currUser?.accountType && currUser?.accountType.toUpperCase()} ACCOUNT</h2>

          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm flex  flex-col gap-5">
            {/* Personal Informations */}
            <div>
            <div className="flex  items-center justify-between">

              <p className='text-gray-600 fonr-md font-semibold flex items-center gap-3'>{currUser?.accountType} ID : <span className='bg-blue-100 text-blue-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm'>#{currUser?._id}</span></p>

              {/* Edit btn */}
              <button
                onClick={() => setIsEditing(() => true)}
                className="btn min-h-[2rem] h-[2.2rem] bg-gray-100 px-3 border-1 border-gray-200 hover:border-gray-300  hover:bg-gray-200  text-black disabled:text-gray-600 font-[900]"
              > <span className="text-blue-600">Edit</span>
                <MdEditNote size={25} className="text-blue-600" />
              </button>

            </div>

            <div className='flex sm:items-center gap-y-5 sm:gap-7 flex-col sm:flex-row'>
                 {/* Image */}
                 <div className="rounded-full">
                <img src={currUser?.image} className="w-[3rem] h-[3rem] rounded-[30px] " alt="User image" />
                 </div>

                {/* FullName */}
                <span className="text-gray-500  text-md font-semibold ">
                {currUser?.firstName + " " + currUser?.lastName}
                </span>
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
          {currUser.accountType==='Seller'&&
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
          {(currUser.accountType==='Seller' || currUser.accountType==='Buyer')  &&
          <div className="flex flex-col gap-y-4">
            <p className="flex items-center gap-2 ">
            <FaAddressCard className="text-blue-500  text-xl  font-semibold"/>
            <span className="text-gray-500   text-sm font-semibold"> Address</span>
            </p>
           {myAddresses.length===0 && 
           <p className="text-gray-500 text-sm font-[600]">No address found for this account </p>}
            <div>
            {myAddresses.length > 0 && myAddresses?.map(address=>(
              <AdderessCart address={address}/>
            ))}
            </div>
            {myAddresses.length <3 &&
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
            className="btn min-h-[2rem] h-[2.5rem] bg-gray-100 border-1 border-gray-200 hover:border-gray-300  hover:bg-gray-200  text-black disabled:text-gray-600 md:mt-0 mt-12"
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
                  type="submit"
                  className="md:px-3 h-[2.3rem]  px-2 py-0 text-md bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center  disabled:opacity-50 disabled:cursor-not-allowed"
                >

                  {fetching ?
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

