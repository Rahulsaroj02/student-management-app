// models/Student.js
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  rollNo: { type: String, unique: true },
  marks: {type: Number},
  attendance: {type: String}
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
export default Student;
