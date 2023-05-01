import {object,string,TypeOf} from 'zod'


export const createUserInput=object({
    body:object({
        firstName:string({
            required_error:'First Name field is required'
        }),
        lastName: string({
            required_error:'Last Name field is required'
        }),
        password:string({
            required_error:'Password Field is required'
        }).min(6,'The password must have minimum 6 characters'),
        passwordConfirmation:string({
            required_error:'Password confirmation field is required'
        }),
        email:string({
            required_error:'Email field is required'
        }).email('Provided email isnot valid')
    }).refine(data=>data.password===data.passwordConfirmation,{
        message:'Passwords dont match',
        path:['passwordConfirmation']
    })
})

export const verifyUserInput=object({
    params:object({
        id:string(),
        verificationCode:string()
    })
})

export type UserInput=TypeOf<typeof createUserInput>['body'];
export type VerifyUserInput=TypeOf<typeof verifyUserInput>['params'];

