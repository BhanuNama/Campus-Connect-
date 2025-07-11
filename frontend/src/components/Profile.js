import React, { useEffect, useState } from "react";
import axios from "axios";
import './Profile.css';

const Profile = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rollNumber = localStorage.getItem("userRollNumber");

    if (!rollNumber) {
      setError("No user logged in.");
      setLoading(false);
      return;
    }

    axios
      .get(`/api/students/${rollNumber}`)
      .then((response) => {
        setStudent(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching profile data.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="text-secondary">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-state card text-center">
          <div className="error-icon mb-md">
            <svg width="64" height="64" viewBox="0 0 20 20" fill="currentColor" className="text-error">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zM9.25 14a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-error mb-sm">Profile Error</h3>
          <p className="text-secondary">{error}</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="container">
        <div className="empty-state card text-center">
          <div className="empty-icon mb-md">
            <svg width="64" height="64" viewBox="0 0 20 20" fill="currentColor" className="text-tertiary">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-secondary mb-sm">No Profile Found</h3>
          <p className="text-secondary">Unable to load student profile information</p>
        </div>
      </div>
    );
  }

  const formatAddress = (address) => {
    if (!address) return 'Not provided';
    const parts = [address.street, address.city, address.state, address.zipCode].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'Not provided';
  };

  const hasSocialLinks = student.socialLinks && (
    student.socialLinks.linkedIn || 
    student.socialLinks.github || 
    student.socialLinks.twitter
  );

  return (
    <div className="profilePage homeContainer fade-in">
      <div className="page-header sectionHeader">
        <h1 className="heroTitle sectionTitle">Student Profile</h1>
        <p className="sectionSubtitle">Your academic profile and personal information</p>
      </div>

      <div className="profile-grid bentoGrid">
        {/* Main Profile Card */}
        <div className="profile-main-card featureCard cardContent bentoItemLarge">
          <div className="profile-header">
            <div className="profile-avatar">
              <img 
                src={student.profileImage || "/default-profile.png"} 
                alt={`${student.name}'s profile`}
                className="avatar-image"
                onError={(e) => {
                  e.target.src = "/default-profile.png";
                }}
              />
              <div className="avatar-status">
                <div className="status-indicator active"></div>
              </div>
            </div>
            <div className="profile-identity">
              <h2 className="profile-name text-2xl font-bold text-primary">{student.name}</h2>
              <p className="profile-role text-lg text-secondary">Student</p>
              <div className="profile-id">
                <span className="id-badge">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm4.75 6.5a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5zm0 3a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" clipRule="evenodd" />
                  </svg>
                  Roll No: {student.rollNumber}
                </span>
              </div>
            </div>
          </div>
          
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v1.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4-2v-5.586a1 1 0 00-.293-.707L3.293 6.293A1 1 0 013 5.586V4z" />
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-value text-lg font-semibold">Active</span>
                <span className="stat-label text-sm text-secondary">Status</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-value text-lg font-semibold">
                  {new Date(student.joinedDate).toLocaleDateString('en-US', { year: 'numeric' })}
                </span>
                <span className="stat-label text-sm text-secondary">Joined</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className="contact-card featureCard cardContent">
          <div className="card-header">
            <h3 className="card-title text-lg font-semibold text-primary">Contact Information</h3>
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="contact-list">
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v1.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4-2v-5.586a1 1 0 00-.293-.707L3.293 6.293A1 1 0 013 5.586V4z" />
                </svg>
              </div>
              <div className="contact-info">
                <span className="contact-label text-sm text-secondary">Email</span>
                <span className="contact-value text-sm font-medium">{student.email}</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="contact-info">
                <span className="contact-label text-sm text-secondary">Phone</span>
                <span className="contact-value text-sm font-medium">{student.contactNumber || 'Not provided'}</span>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="contact-info">
                <span className="contact-label text-sm text-secondary">Address</span>
                <span className="contact-value text-sm font-medium">{formatAddress(student.address)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Details Card */}
        <div className="personal-card featureCard cardContent">
          <div className="card-header">
            <h3 className="card-title text-lg font-semibold text-primary">Personal Details</h3>
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="personal-list">
            <div className="personal-item">
              <span className="personal-label text-sm text-secondary">Date of Birth</span>
              <span className="personal-value text-sm font-medium">
                {new Date(student.dateOfBirth).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="personal-item">
              <span className="personal-label text-sm text-secondary">Joined Date</span>
              <span className="personal-value text-sm font-medium">
                {new Date(student.joinedDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Social Links Card */}
        {hasSocialLinks && (
          <div className="social-card featureCard cardContent">
            <div className="card-header">
              <h3 className="card-title text-lg font-semibold text-primary">Social Links</h3>
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                  <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                </svg>
              </div>
            </div>
            <div className="social-links">
              {student.socialLinks?.linkedIn && (
                <a 
                  href={student.socialLinks.linkedIn} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link linkedin"
                >
                  <div className="social-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span>LinkedIn</span>
                </a>
              )}
              {student.socialLinks?.github && (
                <a 
                  href={student.socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link github"
                >
                  <div className="social-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <span>GitHub</span>
                </a>
              )}
              {student.socialLinks?.twitter && (
                <a 
                  href={student.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link twitter"
                >
                  <div className="social-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </div>
                  <span>Twitter</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
