import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { getAllCategories } from "../../../../operations/category";
import { useDispatch, useSelector } from "react-redux";
import { postListing } from "../../../../operations/listing";
import { useNavigate } from "react-router-dom";
import LoadingBtn from '../../../common/LoadingBtn.jsx'

const UpdateListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productDescription, setProductDescription] = useState([]);
  const [images, setImages] = useState([]);
  const currUser = useSelector(store=>store.auth);

  useEffect(() => {
    getAllCategories(dispatch)
  })

  const allCategories = useSelector(store => store.category);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    
    let productDetails = {
      productName: data.name,
      brand: data.brand,
      category: data.category,
      price: data.price,
      state: data.state,
      returnPolicy: data.returnPolicy,
      images:data.image,
      description: productDescription,
      productWeight: data.itemWeight,
      stock: data.stock,
      discount:data.discount
    }
   
  
    if(currUser.token){
      return await postListing(dispatch,navigate,productDetails,currUser.token)
    }else{
      return document.getElementById('my_modal_3').showModal()
    }
  };

  const handleDescription = (e) => {
    e.preventDefault();
    if (e.target.value !== '') {
      const newEntry = e.target.value;
      setProductDescription((prev) => [...prev, newEntry.trim()]);
      e.target.value = '';
    }

  }

  const handleRemoval = (indx) => {
    setProductDescription(() => productDescription.filter((_, index) => index !== indx))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    console.log(images)
    if (images.length + files.length > 6) {
      alert("Maximum 6 images allowed");
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

      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const fetching = useSelector(store=>store.fetching);
  
  return (
    <div className="w-full bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <section className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <div className="max-w-2xl px-4 py-8 mx-auto lg:py-0">
            <h2 className="mb-10 text-3xl text-center font-extrabold text-blue-600">---- Sell Product ----</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">

                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                  <input
                    type="text"
                    {...register("name", { required: "Product name is required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type product name"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                  <input
                    type="text"
                    {...register("brand", { required: "Brand is required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Product brand"
                  />
                  {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
                </div>

                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                  <input
                    type="number"
                    {...register("price", { required: "Price is required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Price in rupee"
                  />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                  <select
                    {...register("category")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    {allCategories.map(category => {
                      return <option value={category._id}>{category.name}</option>
                    })}

                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Product state</label>
                  <select
                    {...register("state")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    <option value="New">New</option>
                    <option value="Refurbished">Refurbished</option>
                    <option value="Used">Used</option>

                  </select>
                </div>


                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Item Weight (kg)</label>
                  <input
                    type="number"
                    {...register("itemWeight", { required: "Item weight is required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Ex. 12"
                  />
                  {errors.itemWeight && <p className="text-red-500 text-sm">{errors.itemWeight.message}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Return policy</label>
                  <select
                    {...register("returnPolicy")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    <option value="30">30 days</option>
                    <option value="20">20 days</option>
                    <option value="10">10 days</option>
                    <option value="0">None</option>
                  </select>
                </div>
                
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">{'Stock (Numbers of items)'}</label>
                  <input
                    type="number"
                    {...register("stock", { required: "stock is required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Price in rupee"
                  />
                  {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                </div>

                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">{'Discount (in precentage)'}</label>
                  <input
                    type="number"
                    {...register("discount", { required: "Discount is required" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Discount in precentage"
                  />
                  {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message}</p>}
                </div>


                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                  <input
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleDescription(e);
                      }
                    }}
                    {...register("description", {

                      required: { value: productDescription.length == 0, message: 'Description is reuired' }
                    }
                    )}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Press enter to add point"
                  ></input>
                  {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {productDescription.map((desc, indx) => {
                      return <span key={indx} class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-1 py-0.5 rounded-sm flex items-center justify-between gap-x-2" >{desc}<RxCross2
                        onClick={() => handleRemoval(indx)}
                        className="cursor-pointer hover:bg-gray-300 rounded"
                      /></span>
                    })}
                  </div>
                </div>

          

              </div>

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
                          // onChange={handleImageUpload}
                          className="sr-only"
                          {...register("image", {

                            required: { value: true, message: 'Description is reuired' }
                          }
                          )}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WEBP up to 5MB (max 6 images)
                    </p>
                  </div>
                </div>
{/* 
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
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
                </div> */}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {fetching?
                  <LoadingBtn working={'Saving...'}/>
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductForm;
