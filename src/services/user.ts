import UserModel, { User } from "../models/User"

export const createUserService=async(input:Partial<User>)=>{
    return UserModel.create(input);
    
}

export const findUserService=async(id:string)=>{
    return UserModel.findById(id);
}