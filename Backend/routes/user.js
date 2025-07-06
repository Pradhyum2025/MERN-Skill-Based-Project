import express from 'express'
import { becomeSeller, login, signup ,getAllUser} from '../controllers/user.js';
import { isAdmin, isAuth, isBuyer } from '../middlewares/auth.js';

const userRouter = express.Router();

//signup route
userRouter.post('/signup',signup);

//login route
userRouter.post('/login',login);


userRouter.get('/alluser',getAllUser);

//become a seller
userRouter.post('/seller',isAuth,isBuyer,becomeSeller);

export default userRouter;