import express from 'express'
import { becomeSeller, login, signup } from '../controllers/user.js';
import { isAuth, isBuyer, isSeller } from '../middlewares/auth.js';

const userRouter = express.Router();

//signup route
userRouter.post('/signup',signup);

//login route
userRouter.post('/login',login);

//get user
// userRouter.get('/profile',isAuth,getUser);

// //get bag
// userRouter.get('/bag/get',auth,getBag);
// //add to card
// userRouter.get('/bag/:product_id',auth,addToBag);

// //remove to bag
// userRouter.delete('/bag/:product_id',auth,removeFrombag)

//become a seller
userRouter.post('/seller',isAuth,isBuyer,becomeSeller);

export default userRouter;