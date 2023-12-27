import  express  from "express";
import * as userController from '../controllers/user.controller'
import * as authMiddleware from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/signup',userController.newUser)

router.post('/login',userController.login)

router.put('/forgotpassword',userController.requestResetToken)

router.put('/resetpassword',authMiddleware.resetAuth, userController.resetPassword);

export default router
