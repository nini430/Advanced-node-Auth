import express from 'express'
import userRouter from './users'
import authRouter from './auth'

const router=express.Router();

router.get('/health',(req,res)=>{
    return res.sendStatus(200)
})

router.use('/user',userRouter);
router.use('/auth',authRouter)

export default router;