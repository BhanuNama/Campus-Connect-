const express = require("express");
const Student = require("../models/Student");
const router = express.Router();

// Get student by roll number
router.get("/:rollNumber", async (req, res) => {
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get exam results for a specific student
router.get('/:rollNumber/exam-results', async (req, res) => {
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber }, 'examResults');
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student.examResults);
  } catch (error) {
    console.error("Error fetching exam results:", error);
    res.status(500).json({ message: "Error fetching exam results" });
  }
});

// Get fee details for a specific student
router.get('/:rollNumber/fee-details', async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const student = await Student.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student.feeDetails);
  } catch (error) {
    console.error('Error fetching fee details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get attendance for a specific student by roll number
router.get('/:rollNumber/attendance', async (req, res) => {
  const { rollNumber } = req.params;

  try {
    // Find the student by roll number
    const student = await Student.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Return the attendance data
    res.status(200).json({ attendance: student.attendance });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ message: 'Error fetching attendance data' });
  }
});

module.exports = router;
