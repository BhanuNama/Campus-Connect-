const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Student = require('./models/Student'); // Adjust the path if necessary

dotenv.config();

const createTestUser = async () => {
    try {
        // Connect to MongoDB Atlas
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campusconnect';
        
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connected to MongoDB Atlas');

        // Password to be hashed
        const password = 'test_password'; // The plain text password
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        // Create a new student user
        const newUser = new Student({
            name: 'Test Student',
            rollNumber: 'test_roll_number',
            password: hashedPassword,
            email: 'test@student.com',
            dateOfBirth: new Date('2000-01-01'),
            contactNumber: '1234567890',
            // You can add more fields as needed
        });

        // Save the new user to the database
        await newUser.save();
        console.log('✅ Test user created successfully:', {
            name: newUser.name,
            rollNumber: newUser.rollNumber,
            email: newUser.email
        });
        
    } catch (error) {
        console.error('❌ Error creating user:', error.message);
    } finally {
        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
};

createTestUser();
