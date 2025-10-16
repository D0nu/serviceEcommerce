import express from 'express';
import {  deleteUser, getUser, updateUser } from '../Controllers/user.controller';
import { verifyToken } from '../utils/verifyUser';


const router = express.Router();


router.post('/update/:id',verifyToken, updateUser);
router.delete('/delete/:id',verifyToken, deleteUser);
router.get('/:id', verifyToken, getUser);

export default router;