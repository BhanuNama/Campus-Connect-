const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  profileImage: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  contactNumber: { type: String, required: true },
  emergencyContact: { 
    name: String,
    relationship: String,
    phone: String,
  },
  coursesEnrolled: { type: String }, 


  examResults: [{
    examName: String,
    subjects: [{
      subject: String,
      score: Number,
    }],
  }],

  attendance: [
    {
      subject: { type: String, required: true },
      attendancePercentage: { type: Number, required: true, min: 0, max: 100 },
    }
  ],

  feeDetails: { 
    paid: Boolean, 
    dueDate: Date, 
    amountDue: Number 
  },

  extracurricularActivities: [
    {
      activity: String,
      position: String,
      year: Number,
    }
  ],

  academicAdvisor: { type: String },  

  skills: [
    {
      skill: String,
      proficiencyLevel: String,
    }
  ],

  achievements: [
    {
      title: String,
      description: String,
      date: Date,
    }
  ],

  socialLinks: {
    linkedin: String,
    github: String,
  },

  joinedDate: { type: Date, default: Date.now },
});

// Password comparison method
studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Student', studentSchema);
