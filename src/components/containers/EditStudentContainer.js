/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching,
and passes data (if any) as props to the corresponding View component.
It also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentThunk, editStudentThunk } from "../../store/thunks";
import { Redirect } from "react-router-dom";
import EditStudentView from "../views/EditStudentView";

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);

    // Check if student data is passed in props (from Link state)
    const student = this.props.location.state?.student || {};
    this.state = {
      firstname: student.firstname || "",
      lastname: student.lastname || "",
      email: student.email || "",
      imageUrl: student.imageUrl || "",
      gpa: student.gpa || "",
      campusId: student.campusId || null,
      errors: [],
      redirect: false,
      redirectId: null,
      isLoading: !student.firstname, // If no student data is passed, start in loading state
    };
  }

  // Fetch student data if not passed via props
  async componentDidMount() {
    if (!this.state.firstname) {
      const { id } = this.props.match.params; // Get ID from URL params
      try {
        const student = await this.props.fetchStudent(id); // Fetch student data
        console.log(student);
        this.setState({
          firstname: student.firstname,
          lastname: student.lastname,
          email: student.email,
          imageUrl: student.imageUrl,
          gpa: student.gpa,
          campusId: student.campusId,
          isLoading: false, // Stop loading once data is fetched
        });
      } catch (err) {
        console.error("Error fetching student data:", err);
        this.setState({ isLoading: false });
      }
    }
  }

  // Handle form input changes
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.

    // Prepare updated student data
    const updatedStudent = {
      id: this.props.match.params.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      gpa: this.state.gpa,
      campusId: this.state.campusId,
    };
    try {
      // Dispatch the editStudentThunk
      await this.props.editStudent(updatedStudent);

      // Redirect to the updated student's page
      this.setState({
        redirect: true,
        redirectId: updatedStudent.id,
      });
    } catch (errors) {
      if (Array.isArray(errors)) {
        this.setState({ errors }); // Set validation errors
      } else {
        alert(errors.message || "An unexpected error occurred.");
      }
    }
  };

  render() {
    // Redirect after successful submission
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    // Show a loading message while data is being fetched
    if (this.state.isLoading) {
      return <p>Loading student details...</p>;
    }

    // Render the Edit Student view
    return (
      <div>
        <Header />
        <EditStudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          student={this.state} // Pass student details as props
          errors={this.state.errors}
        />
      </div>
    );
  }
}

// Map Redux state to props
const mapState = (state) => {
  return {
    student: state.student,
  };
};

// Map Redux actions to props
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
  };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);
