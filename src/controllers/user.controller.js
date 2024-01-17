import * as UserService from "../services/user.service";
import HttpStatus from "http-status-codes"

export const newUser = async (req, res) =>{
    try{
    const data = await UserService.registerUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data:data,
      message: 'User created successfully'
    });
    }catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: 'user alredy exists'
      });
    }
};

export const login = async (req, res) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      token:data,
      message: 'User log in successful'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
    
  } 
};

export const requestResetToken = async (req, res) => {
  try {
    const user = await UserService.requestResetToken(req.body.email);
    res.status(HttpStatus.OK).json({
      message: `Reset token sent to user email ${user.email}` 
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ 
      error: error.message 
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const result = await UserService.resetPassword(req.user.userId, req.body.newPassword);
    res.status(HttpStatus.OK).json({ 
      message: result 
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      error: error.message 
    });
  }
};