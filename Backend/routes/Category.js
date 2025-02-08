import express from 'express'
import { createCategory, getAllCategory, getSingleCategory, updateCategory } from '../controllers/Category.js';
import {isAdmin, isAuth} from '../middlewares/auth.js'

const categoryRoutes = express.Router();

//Get all catagories handler
categoryRoutes.get('/',getAllCategory);

//Get single catagory handler
categoryRoutes.get('/:categoryId',getSingleCategory);

//Update catagory handler
categoryRoutes.patch("/:categoryId",isAuth,isAdmin,updateCategory);

//Create catagory handler
categoryRoutes.post('/',isAuth,isAdmin,createCategory);

//Delete category handler
// categoryRoutes.delete('/:categoryId',isAuth,isAdmin,deleteCategory)

export default categoryRoutes;