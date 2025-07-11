
const Student = require('../models/Student'); 
const Teacher = require('../models/Teacher'); 
const jwt = require('jsonwebtoken'); 


const login = async (req, res) => {
  const { userId, password, role } = req.body;

  try {
    let user;


    if (role === 'student') {
      user = await Student.findOne({ rollNumber: userId });
    } else if (role === 'teacher') {
      user = await Teacher.findOne({ teacherId: userId }); 
    }

    if (!user || user.password !== password) { 
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token (if using JWT)
    const token = jwt.sign({ id: user._id, role }, 'your_jwt_secret'); // Replace with your JWT secret

    // Send response
    res.status(200).json({ token, rollNumber: user.rollNumber }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
