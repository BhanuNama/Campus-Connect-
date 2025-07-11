import React, { useEffect, useState } from "react";
import axios from "axios";
import './ResultsView.css';

const ResultsView = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const rollNumber = localStorage.getItem("userRollNumber");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/students/${rollNumber}/exam-results`);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (rollNumber) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [rollNumber]);

  const calculateOverallStats = () => {
    if (!Array.isArray(results) || results.length === 0) {
      return { totalExams: 0, totalSubjects: 0, avgScore: 0 };
    }
    
    let totalScore = 0;
    let totalSubjects = 0;
    
    results.forEach(result => {
      if (result.subjects && Array.isArray(result.subjects)) {
        result.subjects.forEach(subject => {
          totalScore += subject.score || 0;
          totalSubjects++;
        });
      }
    });
    
    return {
      totalExams: results.length,
      totalSubjects,
      avgScore: totalSubjects > 0 ? (totalScore / totalSubjects).toFixed(1) : 0
    };
  };

  const handleViewDetails = (result) => {
    setSelectedResult(result);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedResult(null);
  };

  const overallStats = calculateOverallStats();

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="text-secondary">Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container fade-in">
      <div className="page-header">
        <h1 className="text-4xl font-bold text-primary">Exam Results</h1>
        <p className="text-secondary">Your academic performance and exam results</p>
      </div>

      {/* Overall Stats */}
      {overallStats.totalExams > 0 && (
        <div className="stats-section">
          <div className="stats-grid grid grid-cols-3 gap-lg mb-xl">
            <div className="stat-card card card-compact text-center">
              <div className="stat-number text-2xl font-bold text-primary">{overallStats.totalExams}</div>
              <div className="stat-label text-sm text-secondary">Total Exams</div>
            </div>
            <div className="stat-card card card-compact text-center">
              <div className="stat-number text-2xl font-bold text-success">{overallStats.totalSubjects}</div>
              <div className="stat-label text-sm text-secondary">Total Subjects</div>
            </div>
            <div className="stat-card card card-compact text-center">
              <div className="stat-number text-2xl font-bold text-accent">{overallStats.avgScore}</div>
              <div className="stat-label text-sm text-secondary">Average Score</div>
            </div>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {Array.isArray(results) && results.length > 0 ? (
        <div className="results-grid bento-grid">
          {results.map((result, index) => (
            <div 
              key={index} 
              className="result-card card card-interactive slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleViewDetails(result)}
            >
              <div className="result-header">
                <h3 className="result-title text-lg font-semibold text-primary">{result.examName}</h3>
                <div className="result-meta">
                  <span className="subject-count text-sm text-secondary">
                    {result.subjects ? result.subjects.length : 0} subjects
                  </span>
                </div>
              </div>
              
              <div className="subjects-preview">
                {result.subjects && result.subjects.length > 0 ? (
                  <div className="subjects-list">
                    {result.subjects.slice(0, 3).map((subject, idx) => (
                      <div key={idx} className="subject-item">
                        <span className="subject-name text-sm">{subject.subject}</span>
                        <span className="subject-score text-sm font-medium">{subject.score}</span>
                      </div>
                    ))}
                    {result.subjects.length > 3 && (
                      <div className="subject-item">
                        <span className="text-sm text-tertiary">
                          +{result.subjects.length - 3} more subjects
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-tertiary">No subjects available</p>
                )}
              </div>

              <div className="card-action">
                <button className="btn btn-ghost btn-sm w-full">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.147.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state card text-center">
          <div className="empty-icon mb-md">
            <svg width="64" height="64" viewBox="0 0 20 20" fill="currentColor" className="text-tertiary">
              <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm5.25 8.5a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5zm0 3a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-secondary mb-sm">No results available</h3>
          <p className="text-secondary">Your exam results will appear here once available</p>
        </div>
      )}

      {/* Detailed Result Modal */}
      {showModal && selectedResult && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="text-2xl font-semibold text-primary">{selectedResult.examName}</h2>
              <button className="btn btn-ghost btn-sm" onClick={closeModal}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
            
            <div className="subjects-detail">
              <h3 className="text-lg font-semibold text-primary mb-md">Subject-wise Performance</h3>
              {selectedResult.subjects && selectedResult.subjects.length > 0 ? (
                <div className="subjects-table">
                  {selectedResult.subjects.map((subject, idx) => (
                    <div key={idx} className="subject-row">
                      <div className="subject-info">
                        <span className="subject-name font-medium">{subject.subject}</span>
                      </div>
                      <div className="subject-score">
                        <span className="score-text text-lg font-semibold text-primary">{subject.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-secondary">No subjects available for this exam</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsView;
