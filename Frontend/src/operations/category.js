import toast from "react-hot-toast";
import { fetchSliceAction } from "../store/slices/fetchSlice";
import axios from "axios";
import { categorySliceAction } from "../store/slices/categorySlice";

//Create category
export const createCategory = async (dispatch,navigate,categoryData,token)=>{
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axios.post('http://localhost:8080/category', categoryData, {
      headers:{
        'Authorisation':`Bearer ${token}`,
        "Content-Type": "multipart/form-data", 
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());

    if (res.data && res.data.success) {
      // console.log("CREATE Category RESPONSE --->>>", res)
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'bottom-center'
      })
      navigate('/dashbord/categories');
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    toast.error(error.response?.data?.message, {
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        fontWeight: 900
      },
      position: 'right-center'
    })
    console.log('Category creation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

// Get all categories
export const getAllCategories = async (dispatch)=>{
  try {
    const res = await axios.get('http://localhost:8080/category');
     
    if (res.data && res.data.success) {
      dispatch(categorySliceAction.setCatagory(res.data.catagories))
      // console.log("Get all category RESPONSE --->>>", res)
    }
  } catch (error) {
    toast.error(error.response?.data?.message, { position: 'top-right', duration: 2000 });
    console.log('Get All Category error EROR: ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

//Delete category
export const deleteCategory = async (dispatch,categoryId,token)=>{
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axios.delete(`http://localhost:8080/category/${categoryId}`,{
      headers:{
        'Authorisation':`Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      // console.log(res)
      dispatch(categorySliceAction.deleteCategory(categoryId))
      document.getElementById('my_modal_1').close();
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'bottom-center'
      })
    }
  } catch (error) {
    document.getElementById('my_modal_1').close()
    dispatch(fetchSliceAction.deserializeFetching());
    toast.error(error.response?.data?.message, {
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        fontWeight: 900
      },
      position: 'right-center'
    })
    console.log('Delete Category error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}

//Edit category
export const updateCategory = async(dispatch,categoryId,updatedData,token)=>{
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axios.patch(`http://localhost:8080/category/${categoryId}`, updatedData, {
      headers:{
        'Authorisation':`Bearer ${token}`,
        "Content-Type": "multipart/form-data", 
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());
    // console.log("Category Updation Response  --->>>", res)
    if (res.data && res.data.success) {
      dispatch(categorySliceAction.deleteCategory(updatedData._id))
      dispatch(categorySliceAction.updateCate(res.data.response))
      document.getElementById('my_modal_1').close();
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          fontWeight: 900
        },
        position: 'bottom-center'
      })
    }

  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    document.getElementById('my_modal_1').close()
    toast.error(error.response?.data?.message, {
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        fontWeight: 900
      },
      position: 'bottom-center'
    })
    console.log('Category updation error : ', error)
    throw new Error(
      error.response?.data?.message || error.message || "An unknown error occurred."
    );
  }
}




