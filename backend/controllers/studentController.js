const Student = require('../models/Student');

// Enroll a new student
exports.enrollStudent = async (req, res) => {
  try {
    const {
      name,
      rollNumber,
      email,
      dateOfBirth,
      contactNumber,
      address,
      coursesEnrolled,
      password
    } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({
      $or: [{ rollNumber }, { email }]
    });

    if (existingStudent) {
      return res.status(400).json({ 
        message: "Student with this roll number or email already exists" 
      });
    }

    // Create a new student record
    const newStudent = new Student({
      name,
      rollNumber,
      email,
      dateOfBirth,
      contactNumber,
      address,
      coursesEnrolled,
      password: password || 'default123'
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();

    // Send success response (don't include password)
    const { password: _, ...responseData } = savedStudent.toObject();
    res.status(201).json({ 
      message: "Student enrolled successfully", 
      student: responseData
    });
    
  } catch (error) {
    console.error("Error enrolling student:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Student with this roll number or email already exists" 
      });
    }
    
    res.status(500).json({ 
      message: "Failed to enroll student", 
      error: error.message
    });
  }
};

// Get all students (for communication/listing)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}, 'name rollNumber email contactNumber coursesEnrolled').lean();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// Get student by roll number
exports.getStudentByRollNumber = async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const student = await Student.findOne({ rollNumber }).select('-password');
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Server error" });
  }
}; 