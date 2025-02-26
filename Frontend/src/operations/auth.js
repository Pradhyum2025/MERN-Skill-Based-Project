import axios from "axios";
import toast from "react-hot-toast";
import { authSliceAction } from "../store/slices/auth";
import { fetchSliceAction } from "../store/slices/fetchSlice";


// Signup function handler
export const signUp = async (navigate, dispatch, signUpData) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axios.post('http://localhost:8080/auth/signup', signUpData, {
    });
    dispatch(fetchSliceAction.deserializeFetching());
    if (res && res?.data?.success) {
      console.log("SIGNUP RESPONSE ---->>:", res)
      //save user info into local storage
      window.localStorage.setItem('currUser', JSON.stringify(res.data.currUser));
      dispatch(authSliceAction.setUserData(res.data.currUser))
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '350px',
          height:'40px',
          padding:'0px 10px',
          fontWeight: 900
        },
        position: 'bottom-center'
      })

      navigate('/');
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    console.log('SignUp error :',error)
    toast.error(error?.response?.data?.message, {
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        height:'60px',
        padding:'0px 20px',
        fontWeight: 900
      },
      position: 'bottom-center'
    });
  }

}

// Login / Signin function handler
export const signIn = async (navigate,dispatch,formData) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axios.post('http://localhost:8080/auth/login', formData);
    dispatch(fetchSliceAction.deserializeFetching());
    if (res.data && res.data.success) {
      console.log("LOGIN RESPONSE --->>>", res)
      dispatch(authSliceAction.setUserData(res.data.currUser));
      window.localStorage.setItem('currUser', JSON.stringify(res.data.currUser));
      toast.success(res?.data?.message, {
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '350px',
          height:'40px',
          padding:'0px 10px',
          fontWeight: 900
        },
        position: 'bottom-center'
      })
      document.getElementById('my_modal_3').close()
      navigate('/');
    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    toast.error(error?.response?.data?.message, { 
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        height:'60px',
        padding:'0px 20px',
        fontWeight: 900
      },
      position: 'right-center'
     });
    console.log('Login error : ', error)
  }

}


// Login / Signin function handler
export const becomeSeller = async (navigate,dispatch,formData,token) => {
  try {
    dispatch(fetchSliceAction.serializeFetching());
    const res = await axios.post('http://localhost:8080/auth/seller', formData,{
      headers:{
        'Authorisation':`Bearer ${token}`
      }
    });
    dispatch(fetchSliceAction.deserializeFetching());

    if (res.data && res.data.success) {
      console.log("BECOME SELLER RESPONSE --->>>", res)
      dispatch(authSliceAction.setUserData(res.data.currUser));
      window.localStorage.setItem('currUser', JSON.stringify(res.data.currUser));
      toast.success(res?.data?.message, { 
        style: {
          background: '#001a00',
          color: '#f2f2f2',
          borderRadius: '0px',
          width: '400px',
          height:'40px',
          padding:'0px 10px',
          fontWeight: 900
        },
        position: 'bottom-center'
      });
      navigate('/dashbord');

    }
  } catch (error) {
    dispatch(fetchSliceAction.deserializeFetching());
    toast.error(error?.response?.data?.message, { 
      style: {
        background: '#001a00',
        color: '#f2f2f2',
        borderRadius: '0px',
        width: '400px',
        height:'60px',
        padding:'0px 20px',
        fontWeight: 900
      },
      position: 'bottom-center'
     });
    console.log('Become seller error : ', error)
  }

}

// Sign out function 
export const signOut = (dispatch, navigate,setUserDropDown) => {
  dispatch(authSliceAction.signout())
  dispatch(fetchSliceAction.deserializeFetching());
  if(setUserDropDown){
    setUserDropDown(()=>false)
  }
  toast.success('Logout successful', {
    style: {
      background: '#001a00',
      color: '#f2f2f2',
      borderRadius: '0px',
      width: '350px',
      height:'40px',
      padding:'0px 10px',
      fontWeight: 900
    },
    position: 'bottom-center'
  })
  navigate('/')
}

// // Edit Profile Details
// export const updateProfileDetails = async(dispatch,updatedData,token,setIsEditing)=>{
//   try {
//     dispatch(fetchSliceAction.serializeFetching());
//     console.log('Hello')
//     const res = await axios.patch(`http://localhost:8080/profile/details`, updatedData, {
//       headers:{
//         'Authorisation':`Bearer ${token}`
//       }
//     });
//     dispatch(fetchSliceAction.deserializeFetching());
//     if (res.data && res.data.success) {
//       window.localStorage.setItem('currUser', JSON.stringify(res.data.currUser));
//       dispatch(authSliceAction.setFormData(res.data.currUser));
//       setIsEditing(()=>false)
//       // console.log("Profile Details Updation Response  --->>>", res)
//       toast.success(res?.data?.message, { 
//         style: {
//           background: '#001a00',
//           color: '#f2f2f2',
//           borderRadius: '0px',
//           width: '400px',
//           height:'60px',
//           padding:'0px 20px',
//           fontWeight: 900
//         },
//         position: 'bottom-center'
//        });
//     }

//   } catch (error) {
//     dispatch(fetchSliceAction.deserializeFetching());
//     toast.error(error.response?.data?.message, { 
//       style: {
//         background: '#001a00',
//         color: '#f2f2f2',
//         borderRadius: '0px',
//         width: '400px',
//         height:'60px',
//         padding:'0px 20px',
//         fontWeight: 900
//       },
//       position: 'bottom-center'
//     });
//     console.log('Category updation error : ', error)
//     throw new Error(
//       error.response?.data?.message || error.message || "An unknown error occurred."
//     );
//   }
// }

// // Update Profile picture
// export const updateProfileImage = async(dispatch,picData,token,setFetching,setPicture)=>{
//   try {
//     setFetching(()=>true)
//     const res = await axios.patch(`http://localhost:8080/profile/picture`, picData, {
//       headers:{
//         'Authorisation':`Bearer ${token}`,
//         'Content-Type':'multipart/form-data'
//       }
//     });
//     setFetching(()=>false)
//     if (res.data && res.data.success) {
//       window.localStorage.setItem('currUser', JSON.stringify(res.data.currUser));
//       setPicture(res?.data?.currUser?.image)
//       dispatch(authSliceAction.setFormData(res.data.currUser));
//       console.log("Profile Picture Updation Response  --->>>", res)
//       toast.success(res?.data?.message, { position: 'top-right', duration: 2000 });
//     }

//   } catch (error) {
//     setFetching(()=>false)
//     toast.error(error.response?.data?.message, { position: 'top-right', duration: 2000 });
//     console.log('Profile picture updation error : ', error)
//     throw new Error(
//       error.response?.data?.message || error.message || "An unknown error occurred."
//     );
//   }
// }

