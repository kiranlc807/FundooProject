import { StatusCodes } from "http-status-codes";
import User from "../models/user.model";
const bcrypt = require('bcrypt');


export const registerUser = async (body) => {
  const data1 = await User.findOne({
    email:body.email
  })
  if(data1){
    throw StatusCodes.BAD_REQUEST
  }
  else{ 
    const saltRounds = 10
    body.password= await bcrypt.hash(body.password, saltRounds)
    const data = await User.create(body); 
    return data;
  }
  
};

export const login = async (body)=>{
  const data = await User.findOne({
    email:body.email
  })
  if(!data){
    throw new Error("user not found")
  }
  const hasedPassword = data.password;
  const result = await bcrypt.compare(body.password,hasedPassword)
  if(!result)
  {
    throw new Error("Password not match")
  }
 return data;
}
