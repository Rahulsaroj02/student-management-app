import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './rotues/authroutes.js';
import studroutes from './rotues/studentroutes.js';
import facuroutes from './rotues/facultyrotues.js'
import adminRoutes from './rotues/adminroutes.js';
import bcrypt from 'bcrypt';
import User from './models/user.js';

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());


const seedAdmin = async () => {
  const existing = await User.findOne({ email: 'admin@system.com' });
  if (!existing) {
    const hashed = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'System Admin',
      email: 'admin@system.com',
      password: hashed,
      role: 'admin',
      status: 'approved'
    });
    console.log('✅ Admin seeded');
  }else{
    console.log('ℹ️ already Admin seeded');
  }
};

mongoose.connect(process.env.MONGO_URI)
.then(async ()=>{
    console.log("mongoose connected");
    await seedAdmin();
})
.catch((error) => console.error("failed", error));

app.get("/",(req,res)=>{
    res.send("server running..");
});

app.use("/api/auth",authRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/student",studroutes);
app.use("/api/faculty",facuroutes);


const PORT=process.env.PORT || 5001;
app.listen(PORT,()=>console.log(`server is running on http://localhost:${PORT}`));
