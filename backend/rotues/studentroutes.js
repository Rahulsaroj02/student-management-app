// routes/studentRoutes.js
import express from 'express';
import { getStudentProfile } from '../controllers/studentcontroller.js';
import { verifyToken, studentOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyToken, studentOnly, getStudentProfile);

export default router;
