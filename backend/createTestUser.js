const mongoose = require('mongoose');
const config = require('./config');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');

const createTestUsers = async () => {
    try {
        // Connect to MongoDB Atlas
        await mongoose.connect(config.mongoUri);
        console.log('✅ Connected to MongoDB Atlas');

        // Clear existing test users
        await Student.deleteMany({ rollNumber: { $in: ['test123', 'student1'] } });
        await Teacher.deleteMany({ teacherId: { $in: ['teacher1', 'prof001'] } });
        console.log('🧹 Cleared existing test users');

        // Create test student users
        const testStudents = [
            {
                name: 'Test Student',
                rollNumber: 'test123',
                password: 'password123',
                email: 'test@student.com',
                dateOfBirth: new Date('2000-01-01'),
                contactNumber: '1234567890',
                coursesEnrolled: 'Computer Science',
                address: {
                    street: '123 Test St',
                    city: 'Test City',
                    state: 'Test State',
                    zip: '12345'
                }
            },
            {
                name: 'John Student',
                rollNumber: 'student1',
                password: 'student123',
                email: 'john@student.com',
                dateOfBirth: new Date('1999-05-15'),
                contactNumber: '9876543210',
                coursesEnrolled: 'Computer Science',
                address: {
                    street: '456 College Ave',
                    city: 'University Town',
                    state: 'Academic State',
                    zip: '67890'
                }
            }
        ];

        const createdStudents = await Student.insertMany(testStudents);
        console.log('✅ Test students created:', createdStudents.map(s => ({ name: s.name, rollNumber: s.rollNumber })));

        // Create test teacher users
        const testTeachers = [
            {
                name: 'Prof. Test Teacher',
                teacherId: 'teacher1',
                password: 'teacher123',
                email: 'teacher@college.com',
                department: 'Computer Science',
                dateOfJoining: new Date('2020-01-01'),
                contact: '1112223333',
                coursesTaught: ['Data Structures', 'Algorithms'],
                bio: 'Test teacher for the system'
            },
            {
                name: 'Dr. Jane Professor',
                teacherId: 'prof001',
                password: 'prof123',
                email: 'jane@college.com',
                department: 'Mathematics',
                dateOfJoining: new Date('2018-07-15'),
                contact: '4445556666',
                coursesTaught: ['Calculus', 'Linear Algebra'],
                bio: 'Mathematics professor'
            }
        ];

        const createdTeachers = await Teacher.insertMany(testTeachers);
        console.log('✅ Test teachers created:', createdTeachers.map(t => ({ name: t.name, teacherId: t.teacherId })));

        console.log('\n🎉 Test users created successfully!');
        console.log('\n📋 Login Credentials:');
        console.log('STUDENTS:');
        console.log('- Roll Number: test123, Password: password123');
        console.log('- Roll Number: student1, Password: student123');
        console.log('\nTEACHERS:');
        console.log('- Teacher ID: teacher1, Password: teacher123');
        console.log('- Teacher ID: prof001, Password: prof123');
        
    } catch (error) {
        console.error('❌ Error creating users:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
};

createTestUsers();
