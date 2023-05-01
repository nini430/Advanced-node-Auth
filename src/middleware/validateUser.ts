import {AnyZodObject} from 'zod'
import {NextFunction, Request,Response} from 'express'
import log from '../utils/logger';

const validateUser=(schema:AnyZodObject)=>(req:Request,res:Response,next:NextFunction)=>{
    try{
    schema.parse({
        body:req.body,
        params:req.params,
        query:req.query
    })
    next()
    }catch(err:any) {
     return res.status(400).send(err);
    }
}

export default validateUser;