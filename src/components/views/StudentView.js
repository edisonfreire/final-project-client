/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
/*==================================================
StudentView.js
================================================== */
const StudentView = (props) => {
  const { student } = props;

  // Handle missing student data
  if (!student || !student.firstname) {
    return <p>Loading student details...</p>;
  }

  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>

      {/* Handle case when student is not enrolled in any campus */}
      {student.campus ? (
        <>
          <h3>
            Enrolled at:{" "}
            <a href={`/campus/${student.campus.id}`}>{student.campus.name}</a>
          </h3>
        </>
      ) : (
        <h3>This student is not enrolled at any campus.</h3>
      )}

      {/* Display student's image */}
      <img
        src={student.imageUrl || "/default.jpg"}
        alt={student.firstname + " " + student.lastname}
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
    </div>
  );
};

export default StudentView;
