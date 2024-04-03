import { Router } from 'express';
import { registerUserController, loginUserController, logoutUserController } from '../controllers/auth.controller.js';

const router = Router();

// Route for user registration
router.post('/register', registerUserController);

// Route for user login
router.post('/login', loginUserController);

// Route for user logout
router.post('/logout', logoutUserController);

export default router;