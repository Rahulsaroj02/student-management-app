import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Student from '../models/student.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET;

const generateRollNo = (name) => {
  const initials = name
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('');
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `${initials}${randomDigits}`;
};



export const register=async (req,res)=>{
    try{
        const {name,email,password,role}= req.body;
        if(!name || !email || !password || !role)
            return res.status(400).json({ message: 'All fields are required' });

        if(!["student","faculty"].includes(role))
            return res.status(400).json({ message: 'Invalid role' });

        const ismatch =await User.findOne({email});
        if(ismatch){
            return res.status(400).json({ message: 'already exists' });
        }
        const hashpass=await bcrypt.hash(password,10);
        
        const newUser = new User({
            name,
            email,
            password:hashpass,
            role,
            status:'pending'
        });

        const savedUser = await newUser.save();    
        if(role==='student'){
            const newstud=new Student({
                userId:savedUser._id,
                name:savedUser.name,
                rollNo:generateRollNo(savedUser.name),
                marks:0,
                attendance: "0%"
            });
            console.log("new student created");

            await newstud.save();
        }
        res.status(201).json({msg:"registraion pending."});

    }catch(error){
        console.error('Register Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req,res)=>{
    console.log("Login attempt:", req.body);
    try{
        const {email,password}=req.body;
        if(!email || !password)
            return res.status(400).json({msg:"all field must be filled"});
            console.log("Login attempt:", email, password);

        const ismatch =await User.findOne({email});
        if(!ismatch)
            return res.status(400).json({ msg: "User not found" });

        if(ismatch.status !== "approved")
            return res.status(400).json({ msg: "admin not yet approved" });

        const com = await bcrypt.compare(password, ismatch.password);

        if(!com)
            return res.status(400).json({msg:"invalid credantials"});

        const token = jwt.sign(
            {id:ismatch._id,role:ismatch.role},JWT_SECRET,{expiresIn:"1h"}
        );

        res.status(200).json({
            token,
            user: {
            id: ismatch._id,
            name: ismatch.name,
            email: ismatch.email,
            role: ismatch.role
            }
        });
        
    }catch(error){
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};