import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './TeacherProfile.css';

const TeacherProfile = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve the teacherId and token from localStorage
  const teacherId = localStorage.getItem("teacherId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!teacherId || !token) {
      setError("Teacher not logged in.");
      setLoading(false);
      return;
    }

    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(`/api/teachers/${teacherId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token from localStorage
          },
        });

        setTeacherData(response.data); // Set teacher data
      } catch (err) {
        setError("Failed to fetch profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [teacherId, token]); // Fetch data when teacherId or token changes

  // Handle loading and error states
  if (loading) {
    return (
      <div className="teacher-profile">
        <div className="loading-container">
          <div className="loading-spinner">
            <svg width="40" height="40" viewBox="0 0 24 24">
              <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          </div>
          <p className="loading-text">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="teacher-profile">
        <div className="error-container">
          <div className="error-icon">
            <svg width="48" height="48" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="error-title">Profile Error</h2>
          <p className="error-message">{error}</p>
          <Link to="/teacher-home" className="back-button">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Ensure necessary fields are initialized
  const name = teacherData.name || "N/A";
  const email = teacherData.email || "N/A";
  const teacherIdValue = teacherData.teacherId || "N/A";
  const department = teacherData.department || "N/A";
  const contact = teacherData.contact || "N/A";
  const joinDate = teacherData.joinDate || "N/A";
  const qualification = teacherData.qualification || "N/A";
  const experience = teacherData.experience || "N/A";

  return (
    <div className="teacher-profile homeContainer fade-in">
      {/* Header Section */}
      <div className="profile-header sectionHeader">
        <Link to="/teacher-home" className="back-link">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </Link>
        
        <div className="header-content">
          <h1 className="profile-title">Faculty Profile</h1>
          <p className="profile-subtitle">View and manage your profile information</p>
        </div>
      </div>

      {/* Profile Content Grid */}
      <div className="profile-grid bentoGrid">
        {/* Main Profile Card */}
        <div className="main-profile-card featureCard cardContent">
          <div className="profile-avatar-section">
            {teacherData.profileImage ? (
              <div className="profile-avatar">
                <img src={teacherData.profileImage} alt={`${name}'s profile`} />
              </div>
            ) : (
              <div className="profile-avatar-placeholder">
                <svg width="64" height="64" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <div className="profile-name-section">
              <h2 className="profile-name">{name}</h2>
              <p className="profile-role">Faculty Member</p>
              <div className="profile-status">
                <span className="status-indicator active"></span>
                <span className="status-text">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="info-card featureCard cardContent">
          <div className="card-header">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="card-title">Contact Information</h3>
          </div>
          <div className="card-content">
            <div className="info-item">
              <span className="info-label">Email Address</span>
              <span className="info-value">{email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone Number</span>
              <span className="info-value">{contact}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Teacher ID</span>
              <span className="info-value teacher-id">{teacherIdValue}</span>
            </div>
          </div>
        </div>

        {/* Professional Details Card */}
        <div className="info-card featureCard cardContent">
          <div className="card-header">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3z"/>
              </svg>
            </div>
            <h3 className="card-title">Professional Details</h3>
          </div>
          <div className="card-content">
            <div className="info-item">
              <span className="info-label">Department</span>
              <span className="info-value department-badge">{department}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Qualification</span>
              <span className="info-value">{qualification}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Experience</span>
              <span className="info-value">{experience}</span>
            </div>
          </div>
        </div>

        {/* Additional Information Card */}
        <div className="info-card featureCard cardContent">
          <div className="card-header">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="card-title">Additional Information</h3>
          </div>
          <div className="card-content">
            <div className="info-item">
              <span className="info-label">Join Date</span>
              <span className="info-value">{joinDate}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Employee Status</span>
              <span className="info-value status-active">Full Time</span>
            </div>
            <div className="info-item">
              <span className="info-label">Office Hours</span>
              <span className="info-value">9:00 AM - 5:00 PM</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="actions-card featureCard cardContent">
          <div className="card-header">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div className="card-content">
            <div className="actions-grid">
              <Link to="/classes" className="action-button">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 .375.375.75.75.75h12.75c.375 0 .75-.375.75-.75V4.875c0-.621-.504-1.125-1.125-1.125H5.625z" />
                </svg>
                My Classes
              </Link>
              <Link to="/mark-attendance" className="action-button">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2z" clipRule="evenodd" />
                </svg>
                Mark Attendance
              </Link>
              <Link to="/enroll-results" className="action-button">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1z" clipRule="evenodd" />
                </svg>
                Grade Results
              </Link>
              <Link to="/announcements" className="action-button">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
                Announcements
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
