/*==================================================
EditStudentView.js

The Views component is responsible for rendering the edit student page.
It constructs a React component to display the student editing form.
================================================== */
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
  title: {
    flexGrow: 1,
    textAlign: "left",
    textDecoration: "none",
  },
  customizeAppBar: {
    backgroundColor: "#11153e",
    shadows: ["none"],
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

const EditStudentView = (props) => {
  const { handleChange, handleSubmit, student, errors } = props;
  const classes = useStyles();

  // Render an Edit Student view with a form
  return (
    <div>
      <h1>Edit Student</h1>

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
              Update Student Information
            </Typography>
          </div>
          <form
            style={{ textAlign: "center" }}
            onSubmit={(e) => handleSubmit(e)}
          >
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              First Name:
            </label>
            <input
              type="text"
              name="firstname"
              value={student.firstname || ""}
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
              value={student.lastname || ""}
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
            <input
              type="email"
              name="email"
              value={student.email || ""}
              onChange={(e) => handleChange(e)}
            />
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
              value={student.imageUrl || ""}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>GPA:</label>
            <input
              type="text"
              name="gpa"
              value={student.gpa || ""}
              onChange={(e) => handleChange(e)}
            />
            {errors.find((error) => error.field === "gpa") && (
              <p className={classes.errorText}>
                {errors.find((error) => error.field === "gpa").message}
              </p>
            )}
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Campus ID:
            </label>
            <input
              type="number"
              name="campusId"
              value={student.campusId || ""}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <br />

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudentView;
