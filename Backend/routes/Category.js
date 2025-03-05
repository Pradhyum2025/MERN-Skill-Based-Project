import express from 'express'
import { createCategory, getAllCategory, getBrandsOfCategory, getSingleCategory, updateCategory } from '../controllers/Category.js';
import { isAuth,isAdmin } from '../middlewares/auth.js';

const categoryRoutes = express.Router();

//Get all catagories handler
categoryRoutes.get('/',getAllCategory);

//Get single catagory handler
categoryRoutes.get('/:categoryId',getSingleCategory);

categoryRoutes.get('/brand/:categoryId',getBrandsOfCategory);

//Update catagory handler
categoryRoutes.patch("/:categoryId",isAuth,isAdmin,updateCategory);

//Create catagory handler
categoryRoutes.post('/',isAuth,isAdmin,createCategory);

//Delete category handler
// categoryRoutes.delete('/:categoryId',isAuth,isAdmin,deleteCategory)

export default categoryRoutes;