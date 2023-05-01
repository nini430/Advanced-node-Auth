import {Request,Response} from 'express'

import { UserInput } from '../schema/userTypes';
import { createUserService } from '../services/user';

export const createUser=(req:Request<{},{},UserInput>,res:Response)=>{
    try{
     const user=createUserService(req.body);
     return res.status(201).send('User Registered Succesfully');
    }catch(err:any) {
        if(err.code===11000) {
            return res.status(409).json({success:false,msg:'Account already exists'})
        }
        return res.status(500).json({success:false,msg:'Server error'})
    }   
}

