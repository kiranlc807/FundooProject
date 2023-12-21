import  express  from "express";
import * as userController from '../controllers/user.controller'

const router = express.Router()

router.post('/signup',userController.newUser)

export default router
