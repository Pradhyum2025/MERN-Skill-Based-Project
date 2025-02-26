import express from 'express'
import { becomeSeller, login, signup } from '../controllers/user.js';
import { isAuth, isBuyer } from '../middlewares/Auth.js';

const userRouter = express.Router();

//signup route
userRouter.post('/signup',signup);

//login route
userRouter.post('/login',login);

//become a seller
userRouter.post('/seller',isAuth,isBuyer,becomeSeller);

export default userRouter;