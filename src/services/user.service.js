import User from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as emailService from '../utils/user.util'
import { sendemail } from "../utils/sendrabbitmq";



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
  const email = body.email;
  if(!data){
    throw new Error("user not found")
  }
  const hasedPassword = data.password;
  const result = await bcrypt.compare(body.password,hasedPassword)
  if(!result)
  {
    throw new Error("Incorrect Password")
  }
  sendemail(email);
  return jwt.sign({userId:data._id},process.env.LOGIN_SECRET_KEY);
}

export const requestResetToken = async (username) => {
    const user = await User.findOne({
      email:username
    });

    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.RESET_SECRET_KEY, {
      expiresIn: '1h',
    });
    await emailService.sendResetToken(user.email, resetToken);

    return user
};

export const resetPassword = async (userId, newPassword) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }
    // Update the user's password with the new hashed password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    return 'Password reset successfully';
  } catch (error) {
    throw error;
  }
};
