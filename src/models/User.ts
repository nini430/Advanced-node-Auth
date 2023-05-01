import { prop,getModelForClass,Severity,pre,modelOptions,DocumentType } from "@typegoose/typegoose";
import {v4} from 'uuid'
import argon2 from 'argon2'

@pre<User>('save',async function(next) {
    if(!this.isModified('password')) {
        next();
    }

    const hashedPassword=await argon2.hash(this.password);
    this.password=hashedPassword;
    next();
})
@modelOptions({
    schemaOptions:{
        timestamps:true
    },
    options:{
        allowMixed:Severity.ALLOW
    }
})
export class User {
    @prop({required:true,lowercase:true,unique:true})
    email:string;

    @prop({required:true})
    firstName:string;

    @prop({required:true})
    lastName:string;

    @prop({required:true})
    password:string;

    @prop({required:true,default:()=>v4()})
    verificationCode:String;

    @prop()
    resetPasswordCode: string | null;

    @prop({default:false})
    isVerified:boolean;

    async validatePassword(this:DocumentType<User>,candidatePassword:string) {
        const isPasswordCorrect=await argon2.verify(this.password,candidatePassword);
        return isPasswordCorrect;
    }
}

const UserModel=getModelForClass(User);

export default UserModel;