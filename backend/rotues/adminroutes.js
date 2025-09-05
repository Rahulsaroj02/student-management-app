// routes/adminRoutes.js
import express from 'express';
import {
  getPendingUsers,
  approveUser,
  rejectUser,
  getApprovedUsers,
  deleteuser
} from '../controllers/adminController.js';

import { verifyToken } from '../middleware/authMiddleware.js';
import { allowRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All admin routes are protected
router.use(verifyToken, allowRoles(['admin']));

// View pending users
router.get('/pending-users', getPendingUsers);

router.get('/approved-users', getApprovedUsers);


// Approve user
router.patch('/approve/:id', approveUser);
router.delete('/delete/:id',deleteuser);

// Reject user
router.patch('/reject/:id', rejectUser);

export default router;
