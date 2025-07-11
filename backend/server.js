// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const authRoutes = require('./routes/auth'); 
const studentRoutes = require('./routes/student');
const teacherRoutes = require("./routes/teachers");

const app = express();
require('dotenv').config(); // Load environment variables

// Middleware
app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000', // Local development
    'https://campus-connect-rouge.vercel.app' // Production
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true
}));

// MongoDB Atlas connection using config
const MONGODB_URI = config.mongoUri;

// Remove deprecated options
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas connected successfully');
    console.log(`🌐 Connected to database: ${mongoose.connection.name}`);
    console.log(`🔗 Connection string: ${MONGODB_URI.includes('mongodb+srv') ? 'Atlas' : 'Local'}`);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Campus Connect API is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔧 Environment: ${config.nodeEnv}`);
  console.log(`🔑 JWT Secret loaded: ${!!config.jwtSecret}`);
});
