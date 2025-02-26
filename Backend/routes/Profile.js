import express from 'express'
import { getMyAccountDetails, updateProfile, updateProfilePicture } from '../controllers/Profile.js';
import { isAuth, isBuyer, isMultiRoll } from '../middlewares/Auth.js';
const profileRoutes = express.Router();

//Get curr user details
profileRoutes.get("/",isAuth,isMultiRoll,getMyAccountDetails);

//Update profile picture
profileRoutes.patch('/picture',isAuth,isMultiRoll,updateProfilePicture);

//Update profile
profileRoutes.patch('/details',isAuth,isMultiRoll,updateProfile);

//Delete profile
// profileRoutes.delete('/',isAuth,isBuyer,deleteAccount)


export default profileRoutes;