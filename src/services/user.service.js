import User from "../models/user.model";
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
import * as emailService from '../utils/user.util'


const secretKey = "Kirana@4455"
export const registerUser = async (body) => {
  const data1 = await User.findOne({
    email:body.email
  })
  if(data1){
    throw new Error('user already exist')
  }
  else{ 
    const saltRounds = 10
    body.password= await bcrypt.hash(body.password, saltRounds)
    const data = await User.create(body); 
    return data
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
    throw new Error("Incorrect Password")
  }
 return jwt.sign({userId:data._id},secretKey);
}

export const requestResetToken = async (username) => {
    const user = await User.findOne({
      email:username
    });

    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = jwt.sign({ userId: user.email }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    await emailService.sendResetToken(user.email, resetToken);

    return user
};
