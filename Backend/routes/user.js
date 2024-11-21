import express from 'express'
import { addToBag, becomeASeller, getBag, login, removeFrombag, signup,getUser } from '../controllers/user.js';
import { auth, isSeller } from '../middlewares/auth.js';

const userRouter = express.Router();

//signup route
userRouter.post('/signup',signup);

//login route
userRouter.post('/login',login);

//get user
userRouter.get('/profile',auth,getUser);
//get bag
userRouter.get('/bag/get',auth,getBag);
//add to card
userRouter.get('/bag/:product_id',auth,addToBag);

//remove to bag
userRouter.delete('/bag/:product_id',auth,removeFrombag)

//become a seller
userRouter.post('/seller',auth,becomeASeller);

export default userRouter;