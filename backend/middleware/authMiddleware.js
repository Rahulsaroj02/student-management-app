// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user || user.status !== 'approved') {
      return res.status(403).json({ message: 'User not approved or not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    return res.status(403).json({ message: 'Invalid token...',err });
  }
};

// middleware/authMiddleware.js
export const studentOnly = (req, res, next) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};


export const facultyOnly=(req,res,next)=>{
    if(req.user.role !=='faculty'){
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
