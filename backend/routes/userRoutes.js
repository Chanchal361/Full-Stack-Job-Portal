import express from 'express';
import { login, logout, register, updateProfile } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import { singleUpload } from '../middleware/multer.js';

const router =express.Router();

// GET all users
// router.route('/users').post(login);
router.post('/register',singleUpload,register);
router.post("/login",login);
router.get('/logout',logout)
router.post("/profile/update",auth, singleUpload,updateProfile)
export default router;