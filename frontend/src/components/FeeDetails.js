import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeeDetails.css';

const FeeDetails = () => {
  const [feeDetails, setFeeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rollNumber = localStorage.getItem('userRollNumber');

  useEffect(() => {
    const fetchFeeDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/students/${rollNumber}/fee-details`);
        setFeeDetails(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching fee details:', error);
        setError('Unable to fetch fee details');
        setFeeDetails(null);
      } finally {
        setLoading(false);
      }
    };

    if (rollNumber) {
      fetchFeeDetails();
    } else {
      setError('No student roll number found');
      setLoading(false);
    }
  }, [rollNumber]);

  const getStatusBadge = (paid) => {
    return paid ? (
      <span className="status-badge status-success">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
        Paid
      </span>
    ) : (
      <span className="status-badge status-warning">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zM9.25 14a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z" clipRule="evenodd" />
        </svg>
        Pending
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const isOverdue = (dueDate, paid) => {
    if (paid) return false;
    return new Date(dueDate) < new Date();
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="text-secondary">Loading fee details...</p>
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
          <h3 className="text-lg font-semibold text-error mb-sm">Fee Details Error</h3>
          <p className="text-secondary">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feeDetailsPage homeContainer fade-in">
      <div className="page-header sectionHeader">
        <h1 className="heroTitle sectionTitle">Fee Details</h1>
        <p className="sectionSubtitle">Manage your tuition fees and payment history</p>
      </div>

      {feeDetails ? (
        <div className="fee-grid bentoGrid">
          {/* Main Fee Status Card */}
          <div className={`fee-status-card featureCard cardContent bentoItemLarge ${feeDetails.paid ? 'paid' : 'pending'}`}>
            <div className="fee-status-header">
              <div className="status-icon">
                {feeDetails.paid ? (
                  <svg width="48" height="48" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg width="48" height="48" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zM9.25 14a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="status-info">
                <h2 className="status-title text-2xl font-bold">
                  {feeDetails.paid ? 'Fee Paid' : 'Payment Due'}
                </h2>
                <p className="status-subtitle text-lg">
                  {feeDetails.paid ? 'Your fees are up to date' : 'Payment required'}
                </p>
              </div>
            </div>

            <div className="fee-amount">
              <div className="amount-label text-sm text-secondary">Amount</div>
              <div className="amount-value text-4xl font-bold">
                {formatCurrency(feeDetails.amountDue)}
              </div>
            </div>

            <div className="fee-details-grid">
              <div className="detail-item">
                <div className="detail-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="detail-content">
                  <span className="detail-label text-sm text-secondary">Due Date</span>
                  <span className="detail-value text-sm font-medium">
                    {new Date(feeDetails.dueDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  {isOverdue(feeDetails.dueDate, feeDetails.paid) && (
                    <span className="overdue-badge">Overdue</span>
                  )}
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="detail-content">
                  <span className="detail-label text-sm text-secondary">Status</span>
                  <div className="detail-value">{getStatusBadge(feeDetails.paid)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Actions Card */}
          <div className="payment-actions-card featureCard cardContent">
            <div className="card-header">
              <h3 className="card-title text-lg font-semibold text-primary">Payment Options</h3>
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 8a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2v-4a2 2 0 00-2-2H4zM3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
              </div>
            </div>

            <div className="payment-content">
              <p className="payment-description text-sm text-secondary mb-lg">
                {feeDetails.paid 
                  ? 'Your fees have been successfully paid. You can download your receipt below.' 
                  : 'Click below to pay your fee securely through our payment gateway.'
                }
              </p>

              <div className="payment-buttons">
                <a 
                  href="https://www.kmit.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 8a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2v-4a2 2 0 00-2-2H4zM3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                  {feeDetails.paid ? 'Pay Next Installment' : 'Pay Fee Now'}
                </a>

                {feeDetails.paid && (
                  <button className="btn btn-secondary w-full">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm4.75 6.5a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5zm0 3a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z" clipRule="evenodd" />
                    </svg>
                    Download Receipt
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Fee Breakdown Card */}
          <div className="fee-breakdown-card featureCard cardContent">
            <div className="card-header">
              <h3 className="card-title text-lg font-semibold text-primary">Fee Breakdown</h3>
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1zM9.5 6A1.5 1.5 0 008 7.5v9A1.5 1.5 0 009.5 18h1a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 6h-1zM3.5 10A1.5 1.5 0 002 11.5v5A1.5 1.5 0 003.5 18h1A1.5 1.5 0 006 16.5v-5A1.5 1.5 0 004.5 10h-1z" />
                </svg>
              </div>
            </div>

            <div className="breakdown-content">
              <div className="breakdown-item">
                <span className="breakdown-label">Tuition Fee</span>
                <span className="breakdown-amount">{formatCurrency(feeDetails.amountDue * 0.8)}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Library Fee</span>
                <span className="breakdown-amount">{formatCurrency(feeDetails.amountDue * 0.1)}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Lab Fee</span>
                <span className="breakdown-amount">{formatCurrency(feeDetails.amountDue * 0.1)}</span>
              </div>
              <div className="breakdown-item total">
                <span className="breakdown-label">Total Amount</span>
                <span className="breakdown-amount">{formatCurrency(feeDetails.amountDue)}</span>
              </div>
            </div>
          </div>

          {/* Help & Support Card */}
          <div className="help-support-card featureCard cardContent">
            <div className="card-header">
              <h3 className="card-title text-lg font-semibold text-primary">Help & Support</h3>
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061C8.735 4.021 9.588 3.5 10.5 3.5c.892 0 1.734.471 2.319 1.253.583.78.681 1.756.378 2.66-.165.495-.407.905-.711 1.222a4.663 4.663 0 01-.633.415.75.75 0 01-.762-1.295c.173-.102.302-.208.393-.32.146-.18.218-.34.218-.5 0-.41-.212-.872-.59-1.245-.377-.372-.896-.623-1.512-.623-.616 0-1.135.251-1.512.623-.377.373-.59.835-.59 1.245a.75.75 0 01-1.5 0zm2.75 6.31a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="help-content">
              <div className="help-item">
                <div className="help-icon">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="help-info">
                  <span className="help-label">Phone Support</span>
                  <span className="help-value">+91-40-1234-5678</span>
                </div>
              </div>
              
              <div className="help-item">
                <div className="help-icon">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v1.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4-2v-5.586a1 1 0 00-.293-.707L3.293 6.293A1 1 0 013 5.586V4z" />
                  </svg>
                </div>
                <div className="help-info">
                  <span className="help-label">Email Support</span>
                  <span className="help-value">fees@college.edu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state featureCard cardContent text-center">
          <div className="empty-icon mb-md">
            <svg width="64" height="64" viewBox="0 0 20 20" fill="currentColor" className="text-tertiary">
              <path d="M4 8a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2v-4a2 2 0 00-2-2H4zM3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-secondary mb-sm">No Fee Details Available</h3>
          <p className="text-secondary">Your fee information will appear here once available</p>
        </div>
      )}
    </div>
  );
};

export default FeeDetails;
