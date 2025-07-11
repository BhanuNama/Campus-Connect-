import React, { useState } from 'react';
import axios from 'axios';
import './EnrollResults.css';

const EnrollResults = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [examName, setExamName] = useState('');
  const [subjects, setSubjects] = useState([{ subject: '', score: '' }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { subject: '', score: '' }]);
  };

  const handleRemoveSubject = (index) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultData = {
      rollNumber,
      examName,
      subjects: subjects.map((subj) => ({
        subject: subj.subject,
        score: Number(subj.score)
      }))
    };

    console.log("Data being sent to backend:", resultData);

    try {
      await axios.post('/api/teachers/enroll-results', resultData);
      setSuccess('Result enrolled successfully!');
      setError('');
      // Reset form
      setRollNumber('');
      setExamName('');
      setSubjects([{ subject: '', score: '' }]);
    } catch (err) {
      console.error("Error enrolling result:", err);
      setError('Failed to enroll result');
      setSuccess('');
    }
  };

  return (
    <div className="enrollResultsPage homeContainer fade-in">
      <div className="page-header sectionHeader">
        <h1 className="heroTitle sectionTitle">Enroll Student Results</h1>
        <p className="sectionSubtitle">Enter student exam results and scores</p>
      </div>

      <div className="enroll-form-container bentoGrid">
        <div className="form-card featureCard cardContent">
          {error && (
            <div className="alert alert-error">
              <svg className="alert-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zM9.25 14a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          
          {success && (
            <div className="alert alert-success">
              <svg className="alert-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}

          <form className="enroll-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3 className="section-title cardTitle">Student Information</h3>
              
              <div className="form-row grid grid-cols-2 gap-lg">
                <div className="input-group">
                  <label className="label">Roll Number</label>
                  <input
                    type="text"
                    className="input"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="Enter student roll number"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label className="label">Exam Name</label>
                  <input
                    type="text"
                    className="input"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    placeholder="Enter exam name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-header cardHeader">
                <h3 className="section-title cardTitle">Subject Scores</h3>
                <button 
                  type="button" 
                  className="btn btn-secondary ctaButton"
                  onClick={handleAddSubject}
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 0110 3z" clipRule="evenodd" />
                  </svg>
                  Add Subject
                </button>
              </div>
              
              <div className="subjects-grid bentoGrid">
                {subjects.map((subject, index) => (
                  <div key={index} className="subject-card featureCard cardContent">
                    <div className="subject-header cardHeader">
                      <span className="subject-number cardBadge">Subject {index + 1}</span>
                      {subjects.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm remove-btn"
                          onClick={() => handleRemoveSubject(index)}
                        >
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    <div className="subject-inputs">
                      <div className="input-group">
                        <label className="label">Subject Name</label>
                        <input
                          type="text"
                          className="input"
                          value={subject.subject}
                          onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
                          placeholder="Enter subject name"
                          required
                        />
                      </div>
                      
                      <div className="input-group">
                        <label className="label">Score</label>
                        <input
                          type="number"
                          className="input"
                          value={subject.score}
                          onChange={(e) => handleSubjectChange(index, 'score', e.target.value)}
                          placeholder="Enter score"
                          min="0"
                          max="100"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-lg ctaButton">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                Enroll Result
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollResults;
