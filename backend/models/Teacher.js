const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacherId: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Keep this for testing
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  dateOfJoining: { type: Date, required: true },
  contact: { type: String, required: true },
  profileImage: { type: String },
  officeHours: { start: String, end: String, days: [String] },
  coursesTaught: [{ type: String }],
  education: [{ degree: String, institution: String, year: Number }],
  publications: [{ title: String, journal: String, year: Number }],
  awards: [{ title: String, description: String, date: Date }],
  skills: [{ skill: String, proficiencyLevel: String }],
  bio: { type: String },
  socialLinks: {
    linkedIn: String,
    researchGate: String,
    twitter: String,
  },
  advisees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  salaryDetails: {
    basicPay: Number,
    allowances: Number,
    deductions: Number,
  },
  isAdmin: { type: Boolean, default: false },
});

// No need for pre-save hashing or password comparison methods

module.exports = mongoose.model('Teacher', teacherSchema);
