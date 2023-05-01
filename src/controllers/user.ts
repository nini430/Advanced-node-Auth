import {Request,Response} from 'express'

import { UserInput, VerifyUserInput } from '../schema/userTypes';
import { createUserService, findUserService } from '../services/user';
import sendEmail from '../utils/mailer';

export const createUser=async(req:Request<{},{},UserInput>,res:Response)=>{
    try{
     const user=await createUserService(req.body);
     await sendEmail({
        from:'test@example.com',
        to:user.email,
        subject:'verify Your Email',
        text:`Verification code: ${user.verificationCode} ; _id ${user._id}`
     })
     return res.status(201).send('User Registered Succesfully');
    }catch(err:any) {
        if(err.code===11000) {
            return res.status(409).json({success:false,msg:'Account already exists'})
        }
        return res.status(500).json({success:false,msg:'Server error'})
    }   
}

export const verifyUser=async(req:Request<VerifyUserInput>,res:Response)=>{
    const id=req.params.id;
    const verificationCode=req.params.verificationCode;

    const user=await findUserService(id);
    if(!user) {
        return res.status(404).send('Could not verify User');
    }  
  
    if(user.isVerified) {
        return res.status(400).send('User already Verified')
    }

    if(user.verificationCode!==verificationCode) {
        return res.status(400).send('Invalid Verification Code')
    }

    user.isVerified=true;
    await user.save();
    return res.status(200).send('Email verified Sucesfully')
}
