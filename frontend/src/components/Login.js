import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';

const Login = () => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [userId, setUserId] = useState(""); // Roll number or teacher ID
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleLogin = () => {
    setIsTeacher(!isTeacher); // Toggle between teacher and student login
    setError(null); // Clear any existing error message on toggle
  };

  const handleLogoClick = () => {
    // Navigate based on current portal type
    if (isTeacher) {
      navigate('/teacher-home');
    } else {
      navigate('/student-home');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Determine the role based on toggle
      const role = isTeacher ? "teacher" : "student";

      // Make the request to the backend
      const response = await axios.post("/api/auth/login", {
        userId,
        password,
        role, // Send login credentials with role
      });

      // Handle successful login
      const { token } = response.data; // Assuming token is returned from the server
      localStorage.setItem("token", token); // Store token for later use

      if (role === "teacher") {
        // Store teacherId in localStorage
        localStorage.setItem("teacherId", userId); // Store teacherId for teacher login

        // Fetch teacher profile after login
        const teacherResponse = await axios.get(`/api/teachers/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in request header
          },
        });

        // Store teacher data in localStorage (optional, for later use)
        localStorage.setItem("teacherProfile", JSON.stringify(teacherResponse.data));

        // Navigate to teacher home or profile page
        navigate("/teacher-home");
      } else {
        // For student login, store roll number
        localStorage.setItem("userRollNumber", userId); // Store roll number for student login
        navigate("/student-home");
      }

    } catch (error) {
      if (error.response) {
        // If the error is from the server, display the message
        setError(error.response.data.message || "Login failed");
      } else {
        // If the request fails before getting a response
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Background Elements */}
        <div className="login-background">
          <div className="bg-circle bg-circle-1"></div>
          <div className="bg-circle bg-circle-2"></div>
          <div className="bg-circle bg-circle-3"></div>
        </div>

        {/* Main Login Card */}
        <div className="login-card">
          {/* Header Section */}
          <div className="login-header">
            <div className="brand-section" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              <div className="brand-icon">
                <img src="/images/Logo.jpg" alt="Campus Connect Logo" width="32" height="32" style={{ borderRadius: '4px', objectFit: 'cover' }} />
              </div>
              <h1 className="brand-title">CampusConnect</h1>
            </div>
            
            <div className="login-title-section">
              <h2 className="login-title">
                {isTeacher ? "Faculty Portal" : "Student Portal"}
              </h2>
              <p className="login-subtitle">
                Connect and collaborate for a better learning experience
              </p>
            </div>
          </div>

          {/* Role Toggle */}
          <div className="role-toggle">
            <div className="toggle-container">
              <button 
                type="button"
                className={`toggle-option ${!isTeacher ? 'active' : ''}`}
                onClick={() => !isTeacher || toggleLogin()}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Student
              </button>
              <button 
                type="button"
                className={`toggle-option ${isTeacher ? 'active' : ''}`}
                onClick={() => isTeacher || toggleLogin()}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
                Teacher
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="error-alert">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="userId">
                {isTeacher ? "Teacher ID" : "Roll Number"}
              </label>
              <div className="input-container">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  id="userId"
                  className="form-input"
                  placeholder={isTeacher ? "Enter your Teacher ID" : "Enter your Roll Number"}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="input-container">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="form-options">
              <button type="button" className="forgot-link">
                Forgot password?
              </button>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="loading-spinner" width="20" height="20" viewBox="0 0 24 24">
                    <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {isTeacher ? "Access Faculty Portal" : "Access Student Portal"}
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p className="footer-text">
              © 2024 CampusConnect. All rights reserved.
            </p>
          </div>
        </div>

        {/* Side Panel */}
        <div className="side-panel">
          <div className="panel-content">
            <div className="feature-highlight">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Modern Campus Management</h3>
              <p className="feature-description">
                Streamlined communication and collaboration tools designed for the digital age of education.
              </p>
            </div>

            <div className="features-list">
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Real-time Attendance Tracking</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Grade Management System</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Secure Communication Hub</span>
              </div>
              <div className="feature-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Fee Management Portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
