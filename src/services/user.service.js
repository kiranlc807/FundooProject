import { StatusCodes } from "http-status-codes";
import User from "../models/user.model";


export const registerUser = async (body) => {
  const data1 = await User.findOne({
    email:body.email
  })
  if(data1){
    throw StatusCodes.BAD_REQUEST
  }
  else{
    const data = User.create(body)
    return data;
  }
};
