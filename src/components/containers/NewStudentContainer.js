/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import NewStudentView from "../views/NewStudentView";
import { addStudentThunk } from "../../store/thunks";

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: "",
      gpa: "",
      campusId: "",
      errors: [], // Track validation errors
      redirect: false,
      redirectId: null,
    };
  }

  // Capture input data when it is entered
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Take action after user clicks the submit button
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.

    const { firstname, lastname, email, imageUrl, gpa, campusId } = this.state;
    let student = {
      firstname,
      lastname,
      email,
      imageUrl: imageUrl || undefined, // Optional field
      gpa: gpa || undefined, // Optional field
      campusId: campusId || undefined, // Optional field
    };

    try {
      // Add new student in back-end database
      let newStudent = await this.props.addStudent(student);

      // Update state, and trigger redirect to show the new student
      this.setState({
        firstname: "",
        lastname: "",
        email: "",
        imageUrl: "",
        gpa: "",
        campusId: "",
        errors: [], // Clear errors
        redirect: true,
        redirectId: newStudent.id,
      });
    } catch (errors) {
      if (Array.isArray(errors)) {
        this.setState({ errors }); // Set validation errors
      } else {
        alert(errors.message || "An unexpected error occurred.");
      }
    }
  };

  // Unmount when the component is being removed from the DOM
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  // Render new student input form
  render() {
    const { redirect, redirectId, errors } = this.state;

    // Redirect to new student's page after submit
    if (redirect) {
      return <Redirect to={`/student/${redirectId}`} />;
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={errors}
        />
      </div>
    );
  }
}

// Map the addStudentThunk to props
const mapDispatch = (dispatch) => {
  return {
    addStudent: (student) => dispatch(addStudentThunk(student)),
  };
};

// Export store-connected container by default
export default connect(null, mapDispatch)(NewStudentContainer);
