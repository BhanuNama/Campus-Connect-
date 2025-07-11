import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './StudentHome.module.css';

const StudentHome = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState('Student');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get student name from localStorage if available
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
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

  const studentTools = [
    {
      title: "Attendance",
      path: "/attendance",
      description: "Track your class attendance",
      color: "#3B82F6",
      icon: (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Courses",
      path: "/courses",
      description: "View enrolled courses",
      color: "#10B981",
      icon: (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 .375.375.75.75.75h12.75c.375 0 .75-.375.75-.75V4.875c0-.621-.504-1.125-1.125-1.125H5.625z" />
        </svg>
      )
    },
    {
      title: "Results",
      path: "/results",
      description: "Check your exam results",
      color: "#F59E0B",
      icon: (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Fee Details",
      path: "/fee-details",
      description: "Manage fee payments",
      color: "#8B5CF6",
      icon: (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 8a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2v-4a2 2 0 00-2-2H4z" />
        </svg>
      )
    },
    {
      title: "Student Communication",
      path: "/student-communication",
      description: "Connect with faculty",
      color: "#06B6D4",
      icon: (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Extra Activities",
      path: "/activities",
      description: "Extracurricular activities",
      color: "#EF4444",
      icon: (
        <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div className={`${styles.studentHome} ${styles.fadeIn}`}>
      {/* Navigation Header */}
      <nav className={styles.navbar}>
        <div className={styles.navBrand} onClick={() => navigate('/student-home')} style={{ cursor: 'pointer' }}>
          <div className={styles.brandIcon}>
            <img src="/images/Logo.jpg" alt="Campus Connect Logo" width="32" height="32" style={{ borderRadius: '4px', objectFit: 'cover' }} />
          </div>
          <h1 className={styles.brandTitle}>CampusConnect</h1>
        </div>
        <div className={styles.navActions}>
          <Link to="/profile" className={styles.navButton}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Profile
          </Link>
          <button onClick={() => { localStorage.clear(); navigate('/login'); }} className={styles.navButton}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.greetingContent}>
          <h1 className={styles.greeting}>
            {getGreeting()}, {userName}! 👋
          </h1>
          <p className={styles.subGreeting}>
            Welcome back to your academic dashboard
          </p>
          <div className={styles.quickActions}>
            <Link to="/profile" className={styles.actionBtn}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              My Profile
            </Link>
            <button className={styles.actionBtn}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6z" clipRule="evenodd" />
              </svg>
              Notifications
            </button>
          </div>
        </div>

        <div className={styles.timeCard}>
          <div className={styles.timeValue}>{formatTime()}</div>
          <div className={styles.dateInfo}>
            <span className={styles.dayName}>{getDayOfWeek()}</span>
            <span className={styles.dateText}>{formatDate()}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#EFF6FF', color: '#3B82F6' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>85%</div>
            <div className={styles.statLabel}>Attendance</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#D1FAE5', color: '#10B981' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>3.8</div>
            <div className={styles.statLabel}>GPA</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: '#FEF3C7', color: '#F59E0B' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 .375.375.75.75.75h12.75c.375 0 .75-.375.75-.75V4.875c0-.621-.504-1.125-1.125-1.125H5.625z" />
            </svg>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>6</div>
            <div className={styles.statLabel}>Courses</div>
          </div>
        </div>
      </div>

      {/* Student Tools */}
      <div className={styles.toolsSection}>
        <h2 className={styles.sectionTitle}>Student Portal</h2>
        <div className={styles.toolsGrid}>
          {studentTools.map((tool, index) => (
            <Link 
              key={index} 
              to={tool.path} 
              className={styles.dashboardCard}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon} style={{ color: tool.color }}>
                  {tool.icon}
                </div>
                <div className={styles.cardArrow}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{tool.title}</h3>
                <p className={styles.cardDescription}>{tool.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
