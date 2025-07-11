// config.js - Configuration settings for the application
module.exports = {
  // MongoDB Atlas connection string - Use environment variable in production
  mongoUri: process.env.MONGO_URI || process.env.MONGODB_URI || (
    process.env.NODE_ENV === 'production' 
      ? null // Force environment variable in production
      : 'mongodb+srv://bhanunama08:Bhanu%400803@campusconnect.6gmitv2.mongodb.net/campusconnect?retryWrites=true&w=majority&appName=CampusConnect'
  ),
  
  // JWT Secret for authentication - Use environment variable in production
  jwtSecret: process.env.JWT_SECRET || (
    process.env.NODE_ENV === 'production'
      ? null // Force environment variable in production
      : 'campus_connect_jwt_secret_2024_secure_key_local_dev_only'
  ),
  
  // Server port
  port: process.env.PORT || 5000,
  
  // Environment
  nodeEnv: process.env.NODE_ENV || 'development'
}; 