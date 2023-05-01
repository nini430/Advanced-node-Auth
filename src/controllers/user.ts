import {Request,Response} from 'express'

import { UserInput } from '../schema/userTypes';
import { createUserService } from '../services/user';
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

