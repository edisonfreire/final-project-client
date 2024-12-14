/*==================================================
AddStudentToCampusView.js

The Views component is responsible for rendering a web page with data provided by the corresponding Container component.
It constructs a React component to display the form to create a new student or add an existing student.
==================================================*/
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// Create styling for the input form
const useStyles = makeStyles(() => ({
  formContainer: {
    width: "500px",
    backgroundColor: "#f0f0f5",
    borderRadius: "5px",
    margin: "auto",
  },
  studentListContainer: {
    width: "500px",
    margin: "20px auto",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
  },
  studentItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  formTitle: {
    backgroundColor: "#c5c8d6",
    marginBottom: "15px",
    textAlign: "center",
    borderRadius: "5px 5px 0px 0px",
    padding: "3px",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    textAlign: "center",
    margin: "5px 0",
  },
}));

const AddStudentToCampusView = (props) => {
  const {
    handleChange,
    handleSubmitNewStudent,
    handleAddExistingStudent,
    existingStudents = [],
    errors,
  } = props;

  const classes = useStyles();

  return (
    <div>
      <h1>Add Student to Campus</h1>

      {/* New Student Form */}
      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography
              style={{
                fontWeight: "bold",
                fontFamily: "Courier, sans-serif",
                fontSize: "20px",
                color: "#11153e",
              }}
            >
              Create a New Student
            </Typography>
          </div>
          <form
            style={{ textAlign: "center" }}
            onSubmit={(e) => handleSubmitNewStudent(e)}
          >
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              First Name:
            </label>
            <input
              type="text"
              name="firstname"
              onChange={(e) => handleChange(e)}
            />
            {errors.find((error) => error.field === "firstname") && (
              <p className={classes.errorText}>
                {errors.find((error) => error.field === "firstname").message}
              </p>
            )}
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Last Name:
            </label>
            <input
              type="text"
              name="lastname"
              onChange={(e) => handleChange(e)}
            />
            {errors.find((error) => error.field === "lastname") && (
              <p className={classes.errorText}>
                {errors.find((error) => error.field === "lastname").message}
              </p>
            )}
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Email:
            </label>
            <input type="text" name="email" onChange={(e) => handleChange(e)} />
            {errors.find((error) => error.field === "email") && (
              <p className={classes.errorText}>
                {errors.find((error) => error.field === "email").message}
              </p>
            )}
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Image URL:
            </label>
            <input
              type="text"
              name="imageUrl"
              onChange={(e) => handleChange(e)}
            />
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>GPA:</label>
            <input type="text" name="gpa" onChange={(e) => handleChange(e)} />
            {errors.find((error) => error.field === "gpa") && (
              <p className={classes.errorText}>
                {errors.find((error) => error.field === "gpa").message}
              </p>
            )}
            <br />
            <br />

            <Button variant="contained" color="primary" type="submit">
              Create New Student
            </Button>
          </form>
        </div>
      </div>

      {/* Existing Students List */}
      <div className={classes.studentListContainer}>
        <div className={classes.formTitle}>
          <Typography
            style={{
              fontWeight: "bold",
              fontFamily: "Courier, sans-serif",
              fontSize: "20px",
              color: "#11153e",
            }}
          >
            Add an Existing Student
          </Typography>
        </div>
        {existingStudents.length > 0 ? (
          existingStudents.map((student) => (
            <div key={student.id} className={classes.studentItem}>
              <span>
                {student.firstname} {student.lastname}
              </span>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddExistingStudent(student.id)}
              >
                Add to Campus
              </Button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#11153e" }}>
            No students available to add.
          </p>
        )}
      </div>
    </div>
  );
};

export default AddStudentToCampusView;
