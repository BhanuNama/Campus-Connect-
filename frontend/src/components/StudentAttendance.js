import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './StudentAttendance.module.css';

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const rollNumber = localStorage.getItem("userRollNumber");

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!rollNumber) {
        setError('Roll number not found in localStorage');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`/api/students/${rollNumber}/attendance`);
        setAttendance(response.data.attendance);
        setError('');
      } catch (error) {
        setError('Failed to fetch attendance data.');
        console.error("Error fetching attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [rollNumber]);

  const calculateAverageAttendance = () => {
    if (attendance.length === 0) return 0;
    const totalAttendance = attendance.reduce((sum, record) => sum + record.attendancePercentage, 0);
    return (totalAttendance / attendance.length).toFixed(1);
  };

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 85) return 'excellent';
    if (percentage >= 75) return 'good';
    if (percentage >= 65) return 'warning';
    return 'critical';
  };

  const getStatusColor = (status) => {
    const colors = {
      excellent: '#10B981',
      good: '#059669',
      warning: '#D97706',
      critical: '#DC2626'
    };
    return colors[status] || colors.critical;
  };

  const averageAttendance = calculateAverageAttendance();
  const overallStatus = getAttendanceStatus(averageAttendance);

  if (loading) {
    return (
      <div className={`${styles.container} homeContainer`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading attendance data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.container} homeContainer`}>
        <div className={styles.errorState}>
          <div className={styles.errorIcon}>
            <svg width="48" height="48" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5z" clipRule="evenodd" />
            </svg>
          </div>
          <h3>Unable to Load Attendance</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} homeContainer ${styles.fadeIn}`}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Attendance</h1>
        <p className={styles.pageSubtitle}>Track your class attendance and performance</p>
      </div>

      {attendance.length === 0 ? (
        <div className={`${styles.emptyState} featureCard`}>
          <div className={styles.emptyIcon}>
            <svg width="48" height="48" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2z" clipRule="evenodd" />
            </svg>
          </div>
          <h3>No Attendance Records</h3>
          <p>Your attendance records will appear here once available</p>
        </div>
      ) : (
        <div className={styles.attendanceGrid}>
          {/* Overall Summary */}
          <div className={`${styles.summaryCard} featureCard`}>
            <div className={styles.summaryHeader}>
              <div className={styles.summaryIcon}>
                <svg width="32" height="32" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className={styles.summaryInfo}>
                <h2>Overall Attendance</h2>
                <p>Your academic performance overview</p>
              </div>
            </div>

            <div className={styles.percentageDisplay}>
              <div 
                className={styles.percentageValue}
                style={{ color: getStatusColor(overallStatus) }}
              >
                {averageAttendance}%
              </div>
            </div>

            <div className={styles.summaryStats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{attendance.length}</span>
                <span className={styles.statLabel}>Subjects</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>
                  {attendance.filter(record => record.attendancePercentage >= 75).length}
                </span>
                <span className={styles.statLabel}>Above 75%</span>
              </div>
            </div>
          </div>

          {/* Subject Cards */}
          <div className={styles.subjectsGrid}>
            {attendance.map((record, index) => {
              const status = getAttendanceStatus(record.attendancePercentage);
              const color = getStatusColor(status);
              
              return (
                <div key={index} className={`${styles.subjectCard} featureCard`}>
                  <div className={styles.subjectHeader}>
                    <div className={styles.subjectIcon}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 .375.375.75.75.75h12.75c.375 0 .75-.375.75-.75V4.875c0-.621-.504-1.125-1.125-1.125H5.625z" />
                      </svg>
                    </div>
                    <h3 className={styles.subjectName}>{record.subject}</h3>
                  </div>

                  <div className={styles.attendanceProgress}>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill}
                        style={{ 
                          width: `${record.attendancePercentage}%`,
                          backgroundColor: color
                        }}
                      ></div>
                    </div>
                    <div className={styles.progressText}>
                      <span className={styles.percentage} style={{ color: color }}>
                        {record.attendancePercentage}%
                      </span>
                    </div>
                  </div>

                  <div className={styles.attendanceDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Present</span>
                      <span className={styles.detailValue}>
                        {Math.round(record.attendancePercentage * 0.3)}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Total</span>
                      <span className={styles.detailValue}>30</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
