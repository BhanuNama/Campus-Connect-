import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './TeacherHome.css';

const TeacherHome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [teacherName, setTeacherName] = useState('Professor');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get teacher name from localStorage if available
    const storedTeacherName = localStorage.getItem('teacherName');
    if (storedTeacherName) {
      setTeacherName(storedTeacherName);
    }

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getDayOfWeek = () => {
    return currentTime.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  const teacherTools = [
    {
      title: "Classes",
      path: "/classes",
      description: "Manage your class schedules",
      color: "#3B82F6",
      icon: (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 .375.375.75.75.75h12.75c.375 0 .75-.375.75-.75V4.875c0-.621-.504-1.125-1.125-1.125H5.625z" />
        </svg>
      )
    },
    {
      title: "Enroll Results",
      path: "/enroll-results",
      description: "Record student exam results",
      color: "#10B981",
      icon: (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Enroll Student",
      path: "/enroll-student",
      description: "Register new students",
      color: "#F59E0B",
      icon: (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Mark Attendance",
      path: "/mark-attendance",
      description: "Track student attendance",
      color: "#8B5CF6",
      icon: (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Student Communication",
      path: "/student-communication",
      description: "Communicate with students",
      color: "#06B6D4",
      icon: (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Faculty Resources",
      path: "/faculty-resources",
      description: "Access teaching materials",
      color: "#EF4444",
      icon: (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div className="teacher-home homeContainer fade-in">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="greeting-content">
          <h1 className="greeting-title">
            {getGreeting()}, {teacherName}! 👨‍🏫
          </h1>
          <p className="greeting-subtitle">
            Welcome to your faculty dashboard
          </p>
          <div className="quick-actions">
            <Link to="/teacher-profile" className="action-btn primary">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              My Profile
            </Link>
            <button className="action-btn secondary">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6z" clipRule="evenodd" />
              </svg>
              Messages
            </button>
          </div>
        </div>

        <div className="time-card">
          <div className="time-value">{formatTime()}</div>
          <div className="date-info">
            <span className="day-name">{getDayOfWeek()}</span>
            <span className="date-text">{formatDate()}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-section">
        <div className="stat-card featureCard">
          <div className="stat-icon" style={{ backgroundColor: '#EFF6FF', color: '#3B82F6' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 .375.375.75.75.75h12.75c.375 0 .75-.375.75-.75V4.875c0-.621-.504-1.125-1.125-1.125H5.625z" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">6</div>
            <div className="stat-label">Classes</div>
          </div>
        </div>

        <div className="stat-card featureCard">
          <div className="stat-icon" style={{ backgroundColor: '#D1FAE5', color: '#10B981' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">120</div>
            <div className="stat-label">Students</div>
          </div>
        </div>

        <div className="stat-card featureCard">
          <div className="stat-icon" style={{ backgroundColor: '#FEF3C7', color: '#F59E0B' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-value">15</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      {/* Teacher Tools */}
      <div className="tools-section">
        <h2 className="section-title">Teacher Tools</h2>
        <div className="tools-grid bentoGrid">
          {teacherTools.map((tool, index) => (
            <Link 
              key={index} 
              to={tool.path} 
              className="tool-card featureCard cardContent"
            >
              <div className="tool-header">
                <div className="tool-icon" style={{ color: tool.color }}>
                  {tool.icon}
                </div>
                <div className="arrow-icon">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="tool-title">{tool.title}</h3>
              <p className="tool-description">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
