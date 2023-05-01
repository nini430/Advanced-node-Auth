import express from 'express'
import { createUser, verifyUser } from '../controllers/user';
import validateUser from '../middleware/validateUser';
import { createUserInput, verifyUserInput } from '../schema/userTypes';

const router=express.Router();

router.post('/',validateUser(createUserInput),createUser);
router.get('/verify/:id/:verificationCode',validateUser(verifyUserInput),verifyUser);

export default router;