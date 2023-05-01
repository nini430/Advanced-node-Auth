import express from 'express'
import { createUser } from '../controllers/user';
import validateUser from '../middleware/validateUser';
import { createUserInput } from '../schema/userTypes';

const router=express.Router();

router.post('/',validateUser(createUserInput),createUser);

export default router;