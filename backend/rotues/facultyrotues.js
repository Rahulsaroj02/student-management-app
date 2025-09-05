import express from 'express';
import { updateMarks, students } from '../controllers/faccontoller.js';
import { verifyToken, facultyOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/students", verifyToken, facultyOnly, students);
router.patch("/students/:id",verifyToken,facultyOnly,updateMarks);

export default router;