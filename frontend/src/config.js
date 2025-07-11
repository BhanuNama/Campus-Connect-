// Configuration for API endpoints
const config = {
  // Determine API URL based on environment
  API_URL: process.env.REACT_APP_API_URL || (
    process.env.NODE_ENV === 'production' 
      ? '/api'  // Use relative URL in production (same domain)
      : 'http://localhost:5000/api'  // Use localhost in development
  )
};

export default config; 