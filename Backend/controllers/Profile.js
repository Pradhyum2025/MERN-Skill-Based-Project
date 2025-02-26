import { User } from "../models/user.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config();


//Update profile picture
export const updateProfilePicture = async (req, res) => {
  try {
    //Extract user information
    const userId = req.user.id;
    const userRoll = req.user.role
    //Fetch picture path from tmp folder
    const newPicture = req.files['picture[]'];

    let currUser = await User.findById(userId);

    if (!currUser) {
      return res.status(401).json({
        success: false,
        message: 'User not found!',

      })
    }
    //Upload on cloudinary
    const pictureResponse = await uploadImageToCloudinary(newPicture, process.env.FOLDER_NAME);

    //Secure_url return in response
    currUser = await User.findByIdAndUpdate({ _id: userId }, { image: pictureResponse.secure_url }, { new: true })
    
     //get all user details
     let userDetails = null
     if (currUser.accountType === 'Buyer') {  //if user is buyer
       userDetails = await User.findById(userId, { firstName: true, lastName: true, email: true, contact: true, image:true ,accountType:true })
       .populate('addresses')
 
     } else if (currUser.accountType === 'Seller') {  //if user is a seller
       userDetails = await User.findById(userId, {
         firstName: true,
         lastName: true,
         contact: true,
         image:true,
         email: true,
         sellerDetails: true,
         myOrders: true,
         accountType:true
       })
         .populate('sellerDetails', 'companyName contact')
         .populate('addresses')
 
     } else {
       userDetails = await User.findById(userId, {
         firstName: true,
         lastName: true,
         contact: true,
         email: true,
         image:true,
         accountType:true
       })
     }

    const payload = {
      email: userDetails.email,
      id: userDetails._id,
      role: userDetails.accountType
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2h'
    })
    userDetails = userDetails.toObject()
    userDetails.token = token;

    //create cookie and send in response to frontend side
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }


    //retrun response
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      token,
      userDetails,
    })


  } catch (error) {
    console.log("Update profile picture error :", error.message);
    return res.status(500).json({
      success: false,
      message: 'Can not change profile picture!'
    })
  }
}

//Update profile handler
export const updateProfile = async (req, res) => {
  try {
    //extarct data from req body
    const { firstName, lastName, email,contact } = req.body;
    //get userId
    const userId = req.user.id;
    const userRoll = req.user.role
    //validation
    if (!userId || !firstName || !lastName || !contact) {
      return res.status(401).json({
        success: false,
        message: 'All feilds are require! Please try again with proper entries'
      })
    }
    //find user profile
    let currUser = await User.findById(userId)

    if (!currUser) {
      return res.status(401).json({
        success: false,
        message: 'Current user not found!'
      })
    }

    currUser = await User.updateOne({ _id: userId }, {
      firstName,
      lastName, 
      email,
      contact
    },
     { new: true })

    //get all user details
    let userDetails = null
    if (currUser.accountType === 'Buyer') {  //if user is buyer
      userDetails = await User.findById(userId, { firstName: true, lastName: true, email: true, contact: true, image:true ,accountType:true })
      .populate('addresses')

    } else if (currUser.accountType === 'Seller') {  //if user is a seller
      userDetails = await User.findById(userId, {
        firstName: true,
        lastName: true,
        contact: true,
        email: true,
        sellerDetails: true,
        image:true,
        myOrders: true,
        accountType:true
      })
      .populate('sellerDetails', 'companyName contact')
      .populate('addresses')

    } else {
      userDetails = await User.findById(userId, {
        firstName: true,
        lastName: true,
        contact: true,
        email: true,
        image:true,
        accountType:true
      })
    }

    const payload = {
      email: userDetails.email,
      id: userDetails._id,
      role: userDetails.accountType
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2h'
    })
    userDetails = userDetails.toObject()
    userDetails.token = token;

    //create cookie and send in response to frontend side
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }


    //retrun response
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      token,
      userDetails,
    })


  } catch (error) {
    console.log('Error occured in update profile : ', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    })
  }
}


//Get all user handler
export const getMyAccountDetails = async (req, res) => {
  try {
    //get user id
    const userId = req.user.id;
    const userRoll = req.user.role;

    const currUser = await User.findOne({ _id: userId, accountType: userRoll })

    if (!currUser) {
      return res.status(200).json({
        success: false,
        message: 'User  Not Found',
      })
    }

    //get all user details
    let userDetails = null
    if (currUser.accountType === 'Buyer') {  //if user is buyer
      userDetails = await User.findById(userId, { firstName: true, lastName: true, email: true, contact: true, image:true ,  accountType:true })
      .populate('addresses')

    } else if (currUser.accountType === 'Seller') {  //if user is a seller
      userDetails = await User.findById(userId, {
        firstName: true,
        lastName: true,
        contact: true,
        email: true,
        image:true,
        sellerDetails: true,
        myOrders: true,
        accountType:true
      })
      .populate('sellerDetails', 'companyName contact')
      .populate('addresses')

    } else {
      userDetails = await User.findById(userId, {
        firstName: true,
        lastName: true,
        contact: true,
        email: true,
        image:true,
        accountType:true
      })
    }

    const payload = {
      email: userDetails.email,
      id: userDetails._id,
      role: userDetails.accountType
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2h'
    })
    userDetails = userDetails.toObject()
    userDetails.token = token;

    //create cookie and send in response to frontend side
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }

    return res.status(200).json({
      success: true,
      message: 'User details fetched successfully!',
      userDetails,
      token
    })

  } catch (error) {
    console.log("error occured to get user details",error.message)
    return res.status(500).json({
      success: false,
      message: 'Failed to get user details, Please try again!'
    })
  }
}

//Delete account handler
// export const deleteAccount = async (req, res) => {
//   try {
//     //Extract userID
//     const userId = req.user.id
//     //Get user from db
//     const user = await User.findById(userId);
//     //Validation
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         Message: 'Current user not found!'
//       })
//     }

//     //Find profile ID and delete
//     const profileId = user.additionalDetails;

//     await Profile.findByIdAndDelete(profileId);
//     //Find progressID and delete
//     const progresses = user.courseProgress //Array of courseProgress object
//     await CourseProgress.findByIdAndDelete({ _id: { $in: progresses } });

//     //Remove these student from enrolled courses
//     const courses = user.courses; //array of courses

//     if (courses.length > 0) { //If, student is enrolled in more than zero courses
//       for (const currCourse of courses) {
//         await Course.findByIdAndUpdate({ _id: currCourse }, {
//           $pull: {
//             enrolledStudent: userId //remove user from enrolledStudent
//           }
//         })
//       }
//     }
//     //finally delete user account
//     await User.findByIdAndDelete({ _id: userId });

//     //return response
//     return res.status(401).json({
//       success: true,
//       Message: 'User deleted successfully'
//     })

//   } catch (error) {
//     console.log('error occured while deleting account:', error.message);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to delete account'
//     })
//   }
// }