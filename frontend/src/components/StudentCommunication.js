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
      <h2>Student Communication</h2>
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
              <td>{student.rollNumber}</td>
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
  );
};

export default StudentCommunication;
