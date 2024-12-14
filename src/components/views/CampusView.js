/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
/*==================================================
CampusView.js
==================================================*/
import { Link } from "react-router-dom";

const CampusView = (props) => {
  const { campus, removeStudentFromCampus, handleAddStudent, deleteCampus } =
    props;

  if (!campus || !campus.name) {
    return <p>Loading campus details...</p>;
  }

  return (
    <div>
      <h1>{campus.name}</h1>
      <p>Address: {campus.address}</p>
      <p>Description: {campus.description}</p>
      <img
        src={campus.imageUrl || "/default.jpg"}
        alt={campus.name}
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />

      <h2>Students</h2>
      {campus.students && campus.students.length > 0 ? (
        campus.students.map((student) => (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h3>
                {student.firstname} {student.lastname}
              </h3>
            </Link>
            <button onClick={() => removeStudentFromCampus(student.id)}>
              Remove Student
            </button>
            <hr />
          </div>
        ))
      ) : (
        <p>No students are enrolled at this campus.</p>
      )}

      {/* Redirect to Add Student to Campus page */}
      <button onClick={handleAddStudent}>Add Student</button>

      {/* Edit Campus */}
      <Link
        to={{
          pathname: `/campus/${campus.id}/edit`,
          state: { campus },
        }}
      >
        <button>Edit Campus</button>
      </Link>

      {/* Delete Campus */}
      <button onClick={() => deleteCampus(campus.id)}>Delete Campus</button>
    </div>
  );
};

export default CampusView;
