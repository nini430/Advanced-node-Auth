import UserModel, { User } from "../models/User"

export const createUserService=async(input:Partial<User>)=>{
    const user=await UserModel.create(input);
    return user;
}