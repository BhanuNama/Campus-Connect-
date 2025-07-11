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
    'https://campus-connect-new.vercel.app' // Production
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true
}));

// MongoDB Atlas connection using config
const MONGODB_URI = config.mongoUri;

console.log('🔧 MongoDB URI configured:', !!MONGODB_URI);
console.log('🔧 URI type:', MONGODB_URI ? (MONGODB_URI.includes('mongodb+srv') ? 'Atlas SRV' : 'Standard') : 'Not set');

if (!MONGODB_URI) {
  console.error('❌ MongoDB URI is not configured!');
  console.error('💡 Set MONGO_URI environment variable or check config.js');
  process.exit(1);
}

// Parse and validate the URI
let uriToUse = MONGODB_URI;

// Try different URI formats for development if having issues
if (config.nodeEnv !== 'production' && MONGODB_URI.includes('Bhanu%400803')) {
  console.log('🔄 Trying alternative URI formats for development...');
  
  // Option 1: Try without URL encoding the password
  const uriNoEncoding = 'mongodb+srv://bhanunama08:Bhanu@0803@campusconnect.6gmitv2.mongodb.net/campusconnect?retryWrites=true&w=majority&appName=CampusConnect';
  
  // Option 2: Try standard connection (non-SRV) - if SRV is causing issues
  const uriStandard = 'mongodb://bhanunama08:Bhanu%400803@campusconnect-shard-00-00.6gmitv2.mongodb.net:27017,campusconnect-shard-00-01.6gmitv2.mongodb.net:27017,campusconnect-shard-00-02.6gmitv2.mongodb.net:27017/campusconnect?ssl=true&replicaSet=atlas-e3x5ow-shard-0&authSource=admin&retryWrites=true&w=majority&appName=CampusConnect';
  
  console.log('🔄 Will try multiple connection formats if needed...');
}

// Function to try connecting with different URI formats
async function connectToMongoDB() {
  const uriOptions = [
    {
      name: 'Original SRV with encoded password',
      uri: MONGODB_URI
    }
  ];

  // Add alternative URIs for development
  if (config.nodeEnv !== 'production') {
    uriOptions.push(
      {
        name: 'SRV with double-encoded password',
        uri: 'mongodb+srv://bhanunama08:Bhanu%2540803@campusconnect.6gmitv2.mongodb.net/campusconnect?retryWrites=true&w=majority&appName=CampusConnect'
      },
      {
        name: 'SRV with manually constructed password',
        uri: `mongodb+srv://bhanunama08:${encodeURIComponent('Bhanu@0803')}@campusconnect.6gmitv2.mongodb.net/campusconnect?retryWrites=true&w=majority&appName=CampusConnect`
      }
    );
  }

  for (let i = 0; i < uriOptions.length; i++) {
    const option = uriOptions[i];
    console.log(`🔗 Attempt ${i + 1}: Trying ${option.name}...`);
    
    try {
      await mongoose.connect(option.uri);
      console.log('✅ MongoDB Atlas connected successfully');
      console.log(`🌐 Connected to database: ${mongoose.connection.name}`);
      console.log(`🔗 Connection method: ${option.name}`);
      return; // Success, exit the function
    } catch (err) {
      console.error(`❌ Connection attempt ${i + 1} failed:`, err.message);
      
      if (i === uriOptions.length - 1) {
        // Last attempt failed
        console.error('💥 All connection attempts failed!');
        console.error('🔧 Error details:', err);
        console.error('💡 Troubleshooting:');
        console.error('   - Check if password contains special characters that need encoding');
        console.error('   - Verify the cluster hostname is correct');
        console.error('   - Ensure your IP is whitelisted in MongoDB Atlas (allow 0.0.0.0/0 for development)');
        console.error('   - Check if MongoDB Atlas cluster is running');
        process.exit(1);
      } else {
        console.log(`🔄 Trying next connection method...`);
      }
    }
  }
}

console.log('🔗 Attempting to connect to MongoDB...');
connectToMongoDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Campus Connect API is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    environment: config.nodeEnv,
    jwtConfigured: !!config.jwtSecret,
    mongoConfigured: !!config.mongoUri,
    timestamp: new Date().toISOString()
  });
});

// Debug endpoint for development
app.get('/api/debug', (req, res) => {
  if (config.nodeEnv === 'production') {
    return res.status(404).json({ message: 'Not found' });
  }
  
  res.json({
    environment: config.nodeEnv,
    hasJwtSecret: !!config.jwtSecret,
    hasMongoUri: !!config.mongoUri,
    mongoState: mongoose.connection.readyState,
    mongoStates: {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }
  });
});

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔧 Environment: ${config.nodeEnv}`);
  console.log(`🔑 JWT Secret loaded: ${!!config.jwtSecret}`);
});
