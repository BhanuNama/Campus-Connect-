const express = require("express");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student"); 
const studentController = require("../controllers/studentController");
const router = express.Router();

// Retrieve Teacher Details by ID
router.get("/:teacherId", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ teacherId: req.params.teacherId }).lean();
    
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/enroll-results", async (req, res) => {
  const { rollNumber, examName, subjects } = req.body;

  try {
    if (!rollNumber || !examName || !Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ message: "All fields are required, and subjects should be a non-empty array." });
    }

    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const existingExam = student.examResults.find((exam) => exam.examName === examName);
    if (existingExam) {
      return res.status(400).json({ message: `Results for exam "${examName}" are already enrolled.` });
    }

    student.examResults.push({ examName, subjects });
    await student.save();

    return res.status(200).json({ message: "Results enrolled successfully", student });
  } catch (error) {
    console.error("Error enrolling result:", error.stack);
    return res.status(500).json({ message: "An error occurred while enrolling result", error: error.message });
  }
});

// Mark Student Attendance
router.post('/mark-attendance', async (req, res) => {
  const { rollNumber, subjects } = req.body;

  if (!rollNumber || !Array.isArray(subjects) || subjects.length === 0) {
    return res.status(400).json({ message: 'Invalid attendance data.' });
  }

  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const validAttendanceEntries = subjects.filter((subj) =>
      subj.subject && typeof subj.attendancePercentage === 'number' &&
      subj.attendancePercentage >= 0 && subj.attendancePercentage <= 100
    );

    if (validAttendanceEntries.length === 0) {
      return res.status(400).json({ message: 'No valid attendance entries.' });
    }

    student.attendance.push(...validAttendanceEntries);
    await student.save();

    res.status(200).json({ message: 'Attendance marked successfully!' });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Route for enrolling a student - using controller
router.post('/enroll-student', studentController.enrollStudent);

// Get all students for communication - using controller
router.get("/student-communication", studentController.getAllStudents);

module.exports = router;
