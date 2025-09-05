// controllers/adminController.js
import User from '../models/user.js';
import Student from '../models/student.js';

// Get all pending users
export const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'pending' }).select('-password');
    res.status(200).json({pendingUsers});
  } catch (err) {
    console.error('Error getting pending users:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getApprovedUsers = async (req, res) =>{

  try {
    const approvedUsers = await User.find({ status: 'approved' }).select('-password');
    res.status(200).json({ approvedUsers }); // note key name changed here
  } catch (err) {
    console.error('Error getting approved users:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Approve user
export const approveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { status: 'approved' }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User approved', user });
  } catch (err) {
    console.error('Error approving user:', err);
    res.status(500).json({ message: 'Server error....' });
  }
};

export const deleteuser = async (req,res)=>{
  try{
    const {id}=req.params;
    console.log("delete id",id);
    // console.log(User.findById(id));
    await User.findByIdAndDelete(id)
    await Student.findByIdAndDelete(id);

    if (!userDeleted && !studentDeleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
    
  }catch(err){
    console.error(err);
    res.json({msg:"error"});
  }
}

// Reject user
export const rejectUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { status: 'rejected' }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User rejected', user });
  } catch (err) {
    console.error('Error rejecting user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
