/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
/*==================================================
StudentView.js
================================================== */
import React from "react";
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent, handleEditStudent } = props;

  // Handle missing student data
  if (!student || !student.firstname) {
    return <p>Loading student details...</p>;
  }

  return (
    <div>
      {/* Student Details */}
      <h1>{student.firstname + " " + student.lastname}</h1>
      <p>Email: {student.email}</p>
      <p>GPA: {student.gpa ? student.gpa : "N/A"}</p>

      {/* Handle case when student is not enrolled in any campus */}
      {student.campus ? (
        <h3>
          Enrolled at:{" "}
          <Link to={`/campus/${student.campus.id}`}>{student.campus.name}</Link>
        </h3>
      ) : (
        <h3>This student is not enrolled at any campus.</h3>
      )}

      {/* Display student's image */}
      <img
        src={student.imageUrl || "/default.jpg"}
        alt={student.firstname + " " + student.lastname}
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />

      {/* Action Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleEditStudent}>Edit Student</button>
        <button onClick={() => deleteStudent(student.id)}>
          Delete Student
        </button>
      </div>
    </div>
  );
};

export default StudentView;
