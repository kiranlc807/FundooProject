import * as UserService from "../services/user.service";
import HttpStatus from "http-status-codes"


export const newUser = async (req, res) =>{
    try{
    const data = await UserService.registerUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
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
      data:{ 
        name:data.name, 
        emial:data.email
      },
      message: 'User log in successful'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
    
  } 
};