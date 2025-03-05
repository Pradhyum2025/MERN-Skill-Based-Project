import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiBook, FiUploadCloud } from "react-icons/fi";
import { createCategory } from "../../../operations/category";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoaderIcon } from "react-hot-toast";
import LoadingBtn from "../../common/LoadingBtn";
import { RxCross2 } from "react-icons/rx";

const CategoryCreation = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [productBrands, setProductBrands] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const currUser = useSelector(store => store.auth);

  const onSubmit = async (data) => {
    data.relativeBrands = productBrands;

    if (!currUser.token || currUser.accountType !== 'Admin') return;
    try {
      await createCategory(dispatch, navigate, data, currUser.token);
    } catch (error) {
      console.log(error)
    }
  }


  const handleBrands = (e) => {
    e.preventDefault();
    if (e.target.value !== '') {
      const newEntry = e.target.value;
      setProductBrands((prev) => [...prev, newEntry.trim()]);
      e.target.value = '';
    }

  }

  const handleRemovalOfBrands = (indx) => {
    setProductBrands(() => productBrands.filter((_, index) => index !== indx))
  }

  const fetching = useSelector(store => store.fetching);

  return (
    <div className="w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-blue-600 mb-2">Create New Category for organize products</h1>
            <p className="text-gray-600">Add a new category to organize your products effectively</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Category Name Input */}
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-0 outline-0 focus:ring-blue-500 focus:border-blue-500 bg-white ${errors.name ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter category name"
                {...register("name", { required: true, maxLength: 40 })}
              />
              {/* ---- Error handling ---- */}
              {errors.name?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Category of course is required</p>
              )}
            </div>

            {/*startingPrice  */}
            <div>
              <label htmlFor="startingPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Starting price  <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="startingPrice"
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-0 focus:ring-blue-500 focus:border-blue-500 bg-white outline-0 ${errors?.startingPrice ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter starting price or estimated staring price"
                {...register("startingPrice", { required: true, min: 0 })}
              />
              {/* ---- Error handling ---- */}
              {errors.startingPrice?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Starting price is requires</p>
              )}
            </div>

            {/* Discription */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows="4"
                className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-0 outline-0 focus:ring-blue-500 focus:border-blue-500 bg-white ${errors.description ? "border-red-500" : "border-gray-300"}`}
                placeholder="Provide a detailed description of the category (Max length 500 word)"
                aria-describedby="description-error"
                {...register("description", { required: true, maxLength: 500 })}
              />
              {/* ---- Error handling ---- */}
              {errors.description?.type === "required" && (
                <p role="alert" className='text-[.81rem] text-red-500'>Description of category is required</p>
              )}
            </div>

            {/* ------------  Brands ------------  */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Relative brands of category</label>
              <input
                name="relativeBrands"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleBrands(e);
                  }
                }}
                {...register("relativeBrands", {

                  required: { value: productBrands.length === 0 ? true : false, message: 'Relative Brands is reuired' }
                }
                )}
                rows="4"
                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-0 focus:ring-primary-500 focus:border-primary-500 ${errors.name ? "border-red-500" : "border-gray-300"} `}
                placeholder="Press enter to add brands "
              />

              {errors?.relativeBrands && <p className="text-red-500 text-xs">{errors?.relativeBrands?.message}</p>}

              <div className="flex gap-2 mt-2 flex-wrap">
                {productBrands.map((brand, indx) => {
                  return <span key={indx} class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-1 py-0.5 rounded-sm flex items-center justify-between gap-x-2" >{brand}<RxCross2
                    onClick={() => handleRemovalOfBrands(indx)}
                    className="cursor-pointer hover:bg-gray-300 rounded"
                  /></span>
                })}
              </div>
            </div>

            {/* Related image Input */}
            <div className="mb-10">

              <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
              <div className="mt-1 w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload Image</span>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="sr-only"
                        {...register("relatedImage", {
                          required: { value: true, message: 'Images  is reuired' }
                        }
                        )}

                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, WEBP
                  </p>
                </div>
              </div>



              {errors.relatedImage && <p className="text-red-500 text-sm">{errors.relatedImage.message}</p>}
            </div>

            {/* Related  Info */}
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-center text-gray-600">
                <FiBook className="mr-2" />
                <span className="text-sm">Products will be linked after category creation</span>
              </div>
            </div>



            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-4">
              {/* Reset btn */}
              <button
                type="reset"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset
              </button>

              {/* Create btn */}
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {fetching ? <LoadingBtn working={'Creating....'} /> : "Create Category"}
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};

export default CategoryCreation;