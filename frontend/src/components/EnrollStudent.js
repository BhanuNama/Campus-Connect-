import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './EnrollStudentStyles.module.css';

const EnrollStudent = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    dateOfBirth: '',
    contactNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    coursesEnrolled: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      const [field, subField] = name.split('.');
      setStudentData((prevData) => ({
        ...prevData,
        [field]: { ...prevData[field], [subField]: value },
      }));
    } else {
      setStudentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await axios.post('/api/teachers/enroll-student', studentData);
      setMessage(response.data.message || 'Student enrolled successfully!');
      
      // Reset form on success
      setStudentData({
        name: '',
        rollNumber: '',
        email: '',
        dateOfBirth: '',
        contactNumber: '',
        address: {
          street: '',
          city: '',
          state: '',
          zip: '',
        },
        coursesEnrolled: '',
        password: '',
      });
    } catch (error) {
      console.error('Error enrolling student:', error);
      setMessage(error.response?.data?.message || 'Failed to enroll student. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header Section */}
      <div className={styles.header}>
        <Link to="/teacher-home" className={styles.backLink}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </Link>
        
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Student Enrollment</h1>
          <p className={styles.pageSubtitle}>Add a new student to the system</p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.formCard}>
          {/* Form Header */}
          <div className={styles.formHeader}>
            <div className={styles.formIcon}>
              <svg width="32" height="32" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className={styles.formTitle}>New Student Registration</h2>
              <p className={styles.formDescription}>Fill in the student's information below</p>
            </div>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div className={`${styles.message} ${message.includes('Failed') || message.includes('Error') ? styles.messageError : styles.messageSuccess}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                {message.includes('Failed') || message.includes('Error') ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                )}
              </svg>
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Personal Information Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Personal Information</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={studentData.name} 
                    onChange={handleChange} 
                    required 
                    className={styles.input}
                    placeholder="Enter student's full name"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Roll Number</label>
                  <input 
                    type="text" 
                    name="rollNumber" 
                    value={studentData.rollNumber} 
                    onChange={handleChange} 
                    required 
                    className={styles.input}
                    placeholder="Enter roll number"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={studentData.email} 
                    onChange={handleChange} 
                    required 
                    className={styles.input}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Date of Birth</label>
                  <input 
                    type="date" 
                    name="dateOfBirth" 
                    value={studentData.dateOfBirth} 
                    onChange={handleChange} 
                    required 
                    className={styles.input}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Contact Number</label>
                  <input 
                    type="tel" 
                    name="contactNumber" 
                    value={studentData.contactNumber} 
                    onChange={handleChange} 
                    required 
                    className={styles.input}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Address Information</h3>
              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Street Address</label>
                  <input 
                    type="text" 
                    name="address.street" 
                    value={studentData.address.street} 
                    onChange={handleChange} 
                    required 
                    className={styles.input}
                    placeholder="Enter street address"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>City</label>
                  <input 
                    type="text" 
                    name="address.city" 
                    value={studentData.address.city} 
                    onChange={handleChange} 
                    required 
                    className={styles.input}
                    placeholder="Enter city"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>State</label>
                  <input 
                    type="text" 
                    name="address.state" 
                    value={studentData.address.state} 
                    onChange={handleChange} 
                    required 
                    className={styles.input}
                    placeholder="Enter state"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Zip Code</label>
                  <input 
                    type="text" 
                    name="address.zip" 
                    value={studentData.address.zip} 
                    onChange={handleChange} 
                    required 
                    className={styles.input}
                    placeholder="Enter zip code"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Academic Information</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Course</label>
                  <select 
                    name="coursesEnrolled" 
                    value={studentData.coursesEnrolled} 
                    onChange={handleChange} 
                    required
                    className={styles.select}
                  >
                    <option value="">Select Course</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={studentData.password} 
                    onChange={handleChange} 
                    required 
                    className={styles.input}
                    placeholder="Set login password"
                    minLength="6"
                  />
                  <p className={styles.helpText}>Minimum 6 characters</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className={styles.submitSection}>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className={styles.spinner}></div>
                    Enrolling Student...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Enroll Student
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollStudent;
