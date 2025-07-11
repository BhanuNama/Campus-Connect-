import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentCommunication.css";

const StudentCommunication = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/teachers/student-communication");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="student-communication">
      <div className="communication-header">
        <h1 className="page-title">Student Communication</h1>
        <p className="page-subtitle">Contact information for all enrolled students</p>
      </div>
      
      <div className="communication-container">
        {students.length > 0 ? (
          <div className="table-wrapper">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Course Enrolled</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.rollNumber}>
                    <td>
                      <span className="contact-badge">{student.rollNumber}</span>
                    </td>
                    <td>{student.name}</td>
                    <td>
                      <a href={`mailto:${student.email}`}>{student.email}</a>
                    </td>
                    <td>
                      <a href={`tel:${student.contactNumber}`}>{student.contactNumber}</a>
                    </td>
                    <td>{student.coursesEnrolled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3>No students found</h3>
            <p>Student information will appear here when available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCommunication;
