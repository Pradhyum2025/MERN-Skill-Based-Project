import Category from '../models/category.js'
import { uploadImageToCloudinary } from '../utils/imageUploader.js';

//Create Category ka handler function
export const createCategory = async (req, res) => {
  try {
    let { name, description,startingPrice } = req.body;
    name = name.trim();
    //Validation
    const relatedImage  =  req?.files?.['relatedImage[]'];
    let relativeBrands =  req.body?.['relativeBrands[]'];


    if(!name || !description || !startingPrice || !relatedImage || !relativeBrands) {
      return res.status(401).json({
        success: false,
        message: 'All fields are required'
      })
    }
    
    if(Array.isArray(relativeBrands)){
      relativeBrands = relativeBrands.map(brand =>{
        return brand.toUpperCase()
      })
    }else{
     relativeBrands = [relativeBrands.toUpperCase()]
    }

    //Search that input category already present or not
    const currCategory = await Category.findOne({name})

    if(currCategory){
      return res.status(401).json({
        success: false,
        message: 'Current category is already present and we need to unique catagories, Please try again,'
      })
    }

    const relatedImageResponse = await uploadImageToCloudinary(relatedImage);
    //Create category payload
    const categoryPayload = {
      name,
      description,
      startingPrice,
      relativeBrands,
      relatedImage:relatedImageResponse.secure_url
    }

    let response = await Category.create(categoryPayload);

    return res.status(200).json({
      success: true,
      message: "category creation successful!",
      response
    })

  } catch (error) {
    console.log('category creation server error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'category creatation server error'
    })
  }
}

//get all category handler function
export const getAllCategory = async (req, res) => {
  try {
    const allCatagories = await Category.find({})
    if(allCatagories.length===0){
      return res.status(200).json({
        success: false,
        message: 'There is no category',
        catagories: allCatagories
      })
    }
    return res.status(200).json({
      success: true,
      message: 'All catagories return successful',
      catagories: allCatagories
    })

  } catch (error) {
    console.log('error occured in get all category');
    return res.status(500).json({
      success: false,
      message: "Error occured while getting all category"
    })
  }
}

//get specific category handler function
export const getSingleCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const Category = await Category.find({ _id: categoryId }, { name: true, description: true })
      .populate('listingItems')
      .exec();

    return res.status(200).json({
      success: true,
      message: 'Specific category return successful',
      category: Category
    })

  } catch (error) {
    console.log('error occured in get all category');
    return res.status(500).json({
      success: false,
      message: "Error occured while getting all category"
    })
  }
}

// Update specific category handler function
export const updateCategory = async(req,res)=>{
  try{
    const { name, description,startingPrice } = req.body;
    const {categoryId}= req.params;
    const relatedImage  =  req?.files?.['relatedImage[]'];
    let relativeBrands =  req.body?.['relativeBrands[]'];


    //Validation
    if(!name || !description || !startingPrice || !categoryId || !relativeBrands ) {
      return res.status(401).json({
        success: false,
        message: 'All fields are required'
      })
    }
  
    if(Array.isArray(relativeBrands)){
      relativeBrands = relativeBrands.map(brand =>{
        return brand.toUpperCase()
      })
    }else{
     relativeBrands = [relativeBrands.toUpperCase()]
    }


    //Search that input category already present or not
    const currCategory = await Category.findById(categoryId)

    if(!currCategory){
      return res.status(401).json({
        success: false,
        message: 'Category not found'
      })
    }

    let updatedCategoryPayLoad = {
      name,
      description,
      startingPrice,
      relativeBrands
    }

    if(relatedImage){
      const relatedImageResponse = await uploadImageToCloudinary(relatedImage);
      updatedCategoryPayLoad.relatedImage = relatedImageResponse.secure_url;
    }

    
    const response = await Category.findByIdAndUpdate({_id:categoryId},updatedCategoryPayLoad,{new:true})
    

    return res.status(200).json({
      success: true,
      message: "category up to date successfully!",
      response
    })


  }catch(error){
    console.log("Error occured to update category :",error.message);
    return res.status(500).json({
      success:false,
      message:'Failed to update category details'
    })
  }
}

//get all brands of category handler function
export const getBrandsOfCategory = async (req, res) => {
  try {
    const {categoryId } = req.params;
    const Catagory = await Category.findById(categoryId,{relativeBrands:true})
    if(Catagory && Catagory.relativeBrands.length===0){
      return res.status(200).json({
        success: false,
        message: 'There is no product brand listed',
        brands: []
      })
    }
    return res.status(200).json({
      success: true,
      message: 'All catagories return successful',
      brands:  Catagory.relativeBrands
    })

  } catch (error) {
    console.log('error occured in get brands of category');
    return res.status(500).json({
      success: false,
      message: "Error occured while getting brands of  category"
    })
  }
}





//Delete category handler function
// export const deleteCategory = async(req,res)=>{
//   try{
//     let {categoryId} = req.params;
    
//     let currCategory  = await Category.findById(categoryId);
//     if(currCategory){
//       await Category.findByIdAndDelete(categoryId);
      
//       return res.status(200).json({
//         success: true,
//         message: "category deleted successfully!",
//       })
//     }else{
//       return res.status(400).json({
//         success: false,
//         message: "category not found!",
//       })
//     }
//   }catch(error){
//     onsole.log("Error occured to delete category :",error,message);
//     return res.status(500).json({
//       success:false,
//       message:'Failed to delete category!'
//     })
//   }
// }

