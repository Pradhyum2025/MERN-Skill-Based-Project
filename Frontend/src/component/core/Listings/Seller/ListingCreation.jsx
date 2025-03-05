import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { getAllCategories, getBrandsOfCategory } from "../../../../operations/category";
import { useDispatch, useSelector } from "react-redux";
import { postListing } from "../../../../operations/listing";
import { useNavigate } from "react-router-dom";
import LoadingBtn from '../../../common/LoadingBtn.jsx'
import { HiCurrencyRupee } from "react-icons/hi";
import { getMyAddresses } from "../../../../operations/Address.js";
import CreateAddressModal from "../../Address/CreateAddressModal.jsx";


const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetching,setFetching] = useState(false);
  const [productFeatures, setProductFeatures] = useState([]);
  const [images, setImages] = useState([]);
  const currUser = useSelector(store => store.auth);


  useEffect(() => {
    if (currUser.token) {
      getMyAddresses(dispatch, currUser.token)
    }
  }, [])
  useEffect(() => {
    getAllCategories(dispatch)
  }, [])

  const allCategories = useSelector(store => store.category);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    const formData = new FormData();

    // Append each field to FormData
    formData.append("productName", data.name);
    formData.append("brand", data.brand);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("state", data.state);
    formData.append("returnPolicy", data.returnPolicy);
    formData.append("productWeight", data.productWeight);
    formData.append("stock", data.stock);
    formData.append("discount", data.discount);
    formData.append("shippingAddress", data.shippingAddress);

    //for images
    if (Array.isArray(images)) {
      images.forEach(image => {
        formData.append('images', image);
      })
    } else {
      formData.append('images', images);
    }

    //for description
    if (Array.isArray(productFeatures)) {
      productFeatures.forEach(feature => {
        formData.append('features[]', feature);
      })
    } else {
      formData.append('features', productFeatures);
    }

    if (currUser.token) {
      return await postListing(dispatch, navigate, formData, currUser.token,setFetching)
    } else {
      return document.getElementById('my_modal_3').showModal()
    }
  };

  const handleFeatures = (e) => {
    e.preventDefault();
    if (e.target.value !== '') {
      const newEntry = e.target.value;
      setProductFeatures((prev) => [...prev, newEntry.trim()]);
      e.target.value = '';
    }

  }

  const handleRemoval = (indx) => {
    setProductFeatures(() => productFeatures.filter((_, index) => index !== indx))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (images.length + files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed");
        return;
      }
    });

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    return setImages(images.filter((_, i) => i !== index));
  };

  const handleGetBrandsOfCategory = async (e)=>{
    const categoryId = e.target.value;
  
    if(currUser.accountType==='Seller' && categoryId){
      return await getBrandsOfCategory(dispatch,categoryId);
    }else{
      return
    }
  }

  const Brands = useSelector(store => store.bag);
  const myAddresses = useSelector(store => store.addresses);
  
  return (
    <div className="w-full bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        <section className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <div className="max-w-3xl px-4 py-8 mx-auto lg:py-0">
            <h1 className="text-lg font-[700] text-gray-500 text-center mb-3">SELL PRODUCTS</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">

                {/* -----------Category ----------- */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                  <select
                    name="category"
                    {...register("category", {
                      required: { value: true, message: "Category is required" },
                    })}
                    onChange={(e)=>handleGetBrandsOfCategory(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"

                  > <option value={''} >Select category</option>
                    {allCategories.map(category => {
                      return <option value={category._id}>{category.name}</option>
                    })}
                    {errors.category && <p className="text-red-500 text-sm">{errors?.category?.message}</p>}
                  </select>

                </div>
                  
                  {/* Brand Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Brand Name</label>
                  <select
                    name="brand"
                    {...register("brand", {
                      required: { value: true, message: "Brand name is required" },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"

                  > <option value={''} >Select brand</option>
                    {Brands.map(brand => {
                      return <option value={brand}>{brand}</option>
                    })}
                    {errors.brand && <p className="text-red-500 text-sm">{errors?.brand?.message}</p>}
                  </select>

                </div>


                {/* -----------Product Name ----------- */}
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Model Name</label>
                  <input
                    type="text"
                    {...register("name", { required: "Product name is required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter Model Name"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>


                {/* --------------- description---------------  */}
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                  <textarea
                    name="description"
                    {...register("description", {
                      required: { value: true, message: 'Description is reuired' },
                      minLength: { value: 200, message: 'minimum 200 words require' },
                      maxLength: { value: 500, message: 'maximum 500 words require' }
                    }
                    )}
                    rows="3"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter description about product"
                  > </textarea>

                  {errors.description && <p className="text-red-500 text-sm">{errors?.description?.message}</p>}

                  <p className="w-full text-xs text-left">{watch('description')?.length}/200</p>
                </div>


                {/* -----------Price ----------- */}
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900 flex items-center gap-2">Price <HiCurrencyRupee className="text-lg" /></label>
                  <input
                    type="number"
                    {...register("price", {
                      required: { value: true, message: "Price is required" },
                      min: { value: 0, message: 'minimum value should be 0' }
                    }
                    )}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Price in rupee"
                  />
                  {errors.price && <p className="text-red-500 text-sm">{errors?.price?.message}</p>}
                </div>

                {/* -----------Product state ----------- */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Product state</label>
                  <select
                    name="state"
                    {...register("state")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    <option value="New">New</option>
                    <option value="Refurbished">Refurbished</option>
                    <option value="Used">Used</option>

                  </select>
                </div>

                {/* -----------Item Weight ----------- */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Item Weight (grams)</label>
                  <input
                    min={0}
                    name="productWeight"
                    type="number"
                    {...register("productWeight", {
                      required: { value: true, message: "Item weight is required" },
                      min: { value: 0, message: 'Weight of the product should be greater than 0' }
                    }
                    )}

                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Weight of the product in grams"
                  />
                  {errors?.productWeight && <p className="text-red-500 text-sm">{errors?.productWeight?.message}</p>}
                </div>

                {/* -----------Return policy ----------- */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Return policy</label>
                  <select
                    name="returnPolicy"
                    {...register("returnPolicy",
                      {
                        required: { value: true, message: "return policy required" }
                      })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    <option value="30">30 days</option>
                    <option value="20">20 days</option>
                    <option value="10">10 days</option>
                    <option value="0">None</option>
                  </select>
                </div>

                {/* -----------Stock (Numbers of items)----------- */}
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">{'Stock (Numbers of items)'}</label>
                  <input
                    min={0}
                    name="stock"
                    type="number"
                    {...register("stock", {
                      required: { value: true, message: "Stock is required" },
                      min: { value: 1, message: 'Stock of the product should be greater than 0' }
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Price in rupee"
                  />
                  {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                </div>

                {/* ---------- discount ----------- */}
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">{'Discount (in precentage)'}</label>
                  <input
                    name="discount"
                    type="number"
                    {...register("discount", {
                      required: { value: true, message: "Discount is required" },
                      min: { value: 0, message: 'Discount of the product should be equal or greater than 0' },
                      max: { value: 100, message: 'Discount of the product should be equal or less than 100' }
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Discount in precentage"
                  />
                  {errors?.discount && <p className="text-red-500 text-sm">{errors?.discount?.message}</p>}
                </div>


                {/* ------------  Features ------------  */}
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Features</label>
                  <input
                    name="features"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleFeatures(e);
                      }
                    }}
                    {...register("features", {

                      required: { value: productFeatures.length === 0 ? true : false, message: 'Features is reuired' }
                    }
                    )}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Press enter to add point"
                  ></input>
                  {errors?.features && <p className="text-red-500 text-sm">{errors?.features?.message}</p>}
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {productFeatures.map((feature, indx) => {
                      return <span key={indx} class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-1 py-0.5 rounded-sm flex items-center justify-between gap-x-2" >{feature}<RxCross2
                        onClick={() => handleRemoval(indx)}
                        className="cursor-pointer hover:bg-gray-300 rounded"
                      /></span>
                    })}
                  </div>
                </div>

              </div>

              {/* ------------shippingAddress ------------ */}
              <div className="flex flex-col gap-x-2 items-center w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 text-left w-full">shipping Address</label>
                {myAddresses && myAddresses.map(address => {
                  return <div
                    className="flex bg-gray-100 p-2 border-b-2">

                    <input type="radio" value={address._id} name="shippingAddress" className=""
                      {...register("shippingAddress", {
                        required: { value: true, message: "shipping Address is required" },
                      })}
                    />
                    <div className={`flex items-start gap-x-3 px-4 pt-4 pb-2 w-[100%]`}>

                      <div className='flex flex-col gap-y-2'>

                        <div className='flex items-center gap-2'>
                          <span className='text-gray-800 text-[.99rem] font-[700]'>{address.firstName + " " + address.lastName + "  -"}</span>

                          <span className='text-gray-800 text-[.9rem] font-[700]'>{address.contact[0]}</span>
                        </div>

                        <div className='w-[93%]'>
                          <span className='text-gray-600 text-[.86rem] font-[600]'>{address?.streetAddress + ", " + address?.city + ", " + address?.state}</span>
                          <span className='text-gray-900 text-[.87rem] font-[700]'>- {address?.postalCode}</span>
                        </div>

                      </div>

                    </div>
                  </div>
                })}
                {errors?.shippingAddress && <p className="text-red-500 text-sm w-full text-left">{errors?.shippingAddress?.message}</p>}
                <div className='bg-gray-100 h-[3px] shadow-0'></div>

                <div className='w-full flex items-center justify-end p-2'>
                  <button
                    onClick={() => document.getElementById('my_modal_1').showModal()}
                    className='px-4 py-2 w-[2 5%] border-2 border-dashed border-blue-500  flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 text-sm font-semibold text-md'>
                    NEW ADDRESS
                  </button>
                </div>

              </div>

              {/* --------------- Images---------------  */}
              <div className="mb-10">

                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                <div className="mt-1 w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload files</span>
                        <input
                          type="file"
                          multiple
                          name="image"
                          accept="image/*"
                          className="sr-only"
                          {...register("image", {
                            required: { value: images.length == 0 ? true : false, message: 'Images  is reuired' }
                          }
                          )}
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WEBP up to 5MB (max 5 images)
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from(images).map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image ? URL.createObjectURL(image) : null}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-24 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <RxCross2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {errors.image && images.length == 0 && <p className="text-red-500 text-sm">{errors.image.message}</p>}
              </div>

              {/*  ------------- buttons -------------  */}
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {fetching ?
                    <LoadingBtn working={'Saving...'} />
                    :
                    'Create Listing'
                  }
                </button>
                <button
                  type="reset"
                  className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Reset
                </button>
              </div>

            </form>
            <CreateAddressModal />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductForm;
