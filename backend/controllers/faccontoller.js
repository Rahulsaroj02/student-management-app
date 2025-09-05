import User from "../models/user.js";
import Student from "../models/student.js";

export const updateMarks = async(req,res)=>{
    
    try{
        const {id}=req.params;
        const {marks, attendance}=req.body;
          console.log("id",id);
          console.log("marks:",marks);
          console.log("attendance:",attendance);

        const userinfo=await User.findById(id);

            const studinfo = await Student.findOneAndUpdate(
      { userId: id },
      { $set: { ...(marks !== undefined && { marks }), ...(attendance !== undefined && { attendance }) } },
      { new: true }
    );
        if (!studinfo) {
          return res.status(404).json({ msg: 'No student record found for this user' });
        }
        if(!userinfo || userinfo.role!=='student'){
          return res.status(400).json({msg:"no id found"});
        }        

        res.json({ message: 'Marks updated successfully', marks: userinfo.marks });
        
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const students = async (req, res) => {
  try {
    const users = await User.find({ status: "approved", role: "student" }).select("-password");
    res.status(200).json({ students: users });
  } catch (err) {
    console.error('Error getting students:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
