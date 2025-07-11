import React, { useState } from 'react';
import axios from 'axios';
import styles from './TeacherMarkAttendanceStyles.module.css';

const TeacherMarkAttendance = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [subjects, setSubjects] = useState([{ subject: '', attendancePercentage: '' }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { subject: '', attendancePercentage: '' }]);
  };

  const handleRemoveSubject = (index) => {
    if (subjects.length > 1) {
      const updatedSubjects = subjects.filter((_, i) => i !== index);
      setSubjects(updatedSubjects);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setError('');
    setSuccess('');

    // Validate form
    if (!rollNumber.trim()) {
      setError('Please enter a valid roll number.');
      return;
    }

    // Validate subjects
    for (let i = 0; i < subjects.length; i++) {
      const subj = subjects[i];
      if (!subj.subject.trim()) {
        setError(`Please enter subject name for item ${i + 1}.`);
        return;
      }
      if (
        subj.attendancePercentage === '' ||
        subj.attendancePercentage < 0 ||
        subj.attendancePercentage > 100
      ) {
        setError(`Attendance percentage for ${subj.subject} must be between 0 and 100.`);
        return;
      }
    }

    const attendanceData = {
      rollNumber: rollNumber.trim(),
      subjects: subjects.map((subj) => ({
        subject: subj.subject.trim(),
        attendancePercentage: Number(subj.attendancePercentage),
      })),
    };

    console.log("Data being sent to backend:", attendanceData);

    try {
      setLoading(true);
      await axios.post('/api/teachers/mark-attendance', attendanceData);
      setSuccess('Attendance marked successfully!');
      setError('');
      // Reset the form
      setRollNumber('');
      setSubjects([{ subject: '', attendancePercentage: '' }]);
    } catch (err) {
      console.error("Error marking attendance:", err);
      setError(err.response?.data?.message || 'Failed to mark attendance. Please try again.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceStatus = (percentage) => {
    if (percentage === '') return 'neutral';
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
      critical: '#DC2626',
      neutral: '#6B7280'
    };
    return colors[status] || colors.neutral;
  };

  const getTotalSubjects = () => subjects.length;
  const getCompletedSubjects = () => subjects.filter(s => s.subject && s.attendancePercentage !== '').length;
  const getAverageAttendance = () => {
    const validSubjects = subjects.filter(s => s.attendancePercentage !== '');
    if (validSubjects.length === 0) return 0;
    const total = validSubjects.reduce((sum, s) => sum + Number(s.attendancePercentage), 0);
    return (total / validSubjects.length).toFixed(1);
  };

  return (
    <div className={`${styles.container} ${styles.fadeIn}`}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Mark Attendance</h1>
        <p className={styles.pageSubtitle}>Record student attendance for multiple subjects</p>
      </div>

      <div className={styles.attendanceGrid}>
        {/* Progress Overview Card */}
        <div className={styles.progressCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Progress Overview</h3>
            <div className={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1zM9.5 6A1.5 1.5 0 008 7.5v9A1.5 1.5 0 009.5 18h1a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 6h-1zM3.5 10A1.5 1.5 0 002 11.5v5A1.5 1.5 0 003.5 18h1A1.5 1.5 0 006 16.5v-5A1.5 1.5 0 004.5 10h-1z" />
              </svg>
            </div>
          </div>

          <div className={styles.progressStats}>
            <div className={styles.progressStat}>
              <div className={styles.statValue}>{getCompletedSubjects()}/{getTotalSubjects()}</div>
              <div className={styles.statLabel}>Subjects Completed</div>
            </div>
            <div className={styles.progressStat}>
              <div className={styles.statValue}>{getAverageAttendance()}%</div>
              <div className={styles.statLabel}>Average Attendance</div>
            </div>
          </div>

          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ 
                width: `${(getCompletedSubjects() / getTotalSubjects()) * 100}%`,
                backgroundColor: getCompletedSubjects() === getTotalSubjects() ? '#10B981' : '#6366F1'
              }}
            ></div>
          </div>
          <div className={styles.progressText}>
            {getCompletedSubjects() === getTotalSubjects() ? 'Ready to Submit' : 'In Progress'}
          </div>
        </div>

        {/* Main Form Card */}
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Student Information</h3>
            <div className={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className={styles.alert} data-type="error">
              <div className={styles.alertIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zM9.25 14a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className={styles.alert} data-type="success">
              <div className={styles.alertIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              <span>{success}</span>
            </div>
          )}

          <form className={styles.attendanceForm} onSubmit={handleSubmit}>
            {/* Roll Number Input */}
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm4.75 6.5a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5zm0 3a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" clipRule="evenodd" />
                </svg>
                Student Roll Number
              </label>
              <input
                className={styles.input}
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter student roll number"
                required
              />
            </div>

            {/* Subjects Section */}
            <div className={styles.subjectsSection}>
              <div className={styles.sectionHeader}>
                <h4 className={styles.sectionTitle}>Subject Attendance</h4>
                <button
                  type="button"
                  className={styles.addButton}
                  onClick={handleAddSubject}
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                  Add Subject
                </button>
              </div>

              <div className={styles.subjectsGrid}>
                {subjects.map((subject, index) => {
                  const status = getAttendanceStatus(subject.attendancePercentage);
                  const statusColor = getStatusColor(status);
                  
                  return (
                    <div key={index} className={styles.subjectCard}>
                      <div className={styles.subjectHeader}>
                        <div className={styles.subjectNumber}>#{index + 1}</div>
                        {subjects.length > 1 && (
                          <button
                            type="button"
                            className={styles.removeButton}
                            onClick={() => handleRemoveSubject(index)}
                            aria-label="Remove subject"
                          >
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                          </button>
                        )}
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 .375.375.75.75.75h12.75c.375 0 .75-.375.75-.75V4.875c0-.621-.504-1.125-1.125-1.125H5.625zM7.5 6v1.5h5V6h-5zM7.5 9v1.5h5V9h-5zM7.5 12v1.5h5V12h-5z" />
                          </svg>
                          Subject Name
                        </label>
                        <input
                          className={styles.input}
                          type="text"
                          value={subject.subject}
                          onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
                          placeholder="e.g., Mathematics, Physics"
                          required
                        />
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                          </svg>
                          Attendance Percentage
                        </label>
                        <div className={styles.percentageInputWrapper}>
                          <input
                            className={`${styles.input} ${styles.percentageInput}`}
                            type="number"
                            value={subject.attendancePercentage}
                            onChange={(e) => handleSubjectChange(index, 'attendancePercentage', e.target.value)}
                            placeholder="0-100"
                            required
                            min="0"
                            max="100"
                            style={{ borderColor: subject.attendancePercentage ? statusColor : '' }}
                          />
                          <span className={styles.percentageSymbol}>%</span>
                        </div>
                        {subject.attendancePercentage && (
                          <div className={styles.attendancePreview}>
                            <div 
                              className={styles.attendanceBar}
                              style={{ width: `${subject.attendancePercentage}%`, backgroundColor: statusColor }}
                            ></div>
                            <span className={styles.attendanceStatus} style={{ color: statusColor }}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className={styles.submitSection}>
              <button
                type="submit"
                className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className={styles.spinner}></div>
                    Marking Attendance...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Mark Attendance
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Card */}
        <div className={styles.helpCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Quick Guide</h3>
            <div className={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061C8.735 4.021 9.588 3.5 10.5 3.5c.892 0 1.734.471 2.319 1.253.583.78.681 1.756.378 2.66-.165.495-.407.905-.711 1.222a4.663 4.663 0 01-.633.415.75.75 0 01-.762-1.295c.173-.102.302-.208.393-.32.146-.18.218-.34.218-.5 0-.41-.212-.872-.59-1.245-.377-.372-.896-.623-1.512-.623-.616 0-1.135.251-1.512.623-.377.373-.59.835-.59 1.245a.75.75 0 01-1.5 0zm2.75 6.31a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className={styles.helpContent}>
            <div className={styles.helpItem}>
              <div className={styles.helpIcon}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className={styles.helpText}>
                <span className={styles.helpTitle}>Enter Roll Number</span>
                <span className={styles.helpDescription}>Student's unique identification number</span>
              </div>
            </div>

            <div className={styles.helpItem}>
              <div className={styles.helpIcon}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className={styles.helpText}>
                <span className={styles.helpTitle}>Add Subjects</span>
                <span className={styles.helpDescription}>Enter subject name and attendance percentage (0-100)</span>
              </div>
            </div>

            <div className={styles.helpItem}>
              <div className={styles.helpIcon}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className={styles.helpText}>
                <span className={styles.helpTitle}>Submit</span>
                <span className={styles.helpDescription}>Save attendance records to the system</span>
              </div>
            </div>
          </div>

          <div className={styles.attendanceGuide}>
            <h4 className={styles.guideTitle}>Attendance Guidelines</h4>
            <div className={styles.guideItems}>
              <div className={styles.guideItem}>
                <div className={styles.guideBadge} style={{ backgroundColor: '#10B981' }}>85%+</div>
                <span>Excellent</span>
              </div>
              <div className={styles.guideItem}>
                <div className={styles.guideBadge} style={{ backgroundColor: '#059669' }}>75%+</div>
                <span>Good</span>
              </div>
              <div className={styles.guideItem}>
                <div className={styles.guideBadge} style={{ backgroundColor: '#D97706' }}>65%+</div>
                <span>Warning</span>
              </div>
              <div className={styles.guideItem}>
                <div className={styles.guideBadge} style={{ backgroundColor: '#DC2626' }}>&lt;65%</div>
                <span>Critical</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherMarkAttendance;
