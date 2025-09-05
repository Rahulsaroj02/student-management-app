// controllers/studentController.js
import User from '../models/user.js';
import Student from '../models/student.js';

export const getStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user._id).select('-password');
    const stud =  await Student.findOne({userId:student._id});
    console.log("lufffyyyyyy",stud);
    if (!stud) return res.status(404).json({ message: 'Student not found' });
    res.json(stud);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
