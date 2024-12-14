/*==================================================
AddStudentToCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
==================================================*/
/*==================================================
AddStudentToCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
==================================================*/
import Header from "./Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchCampusThunk,
  fetchAllStudentsThunk,
  addStudentThunk,
  editStudentThunk,
} from "../../store/thunks";
import { AddStudentToCampusView } from "../views";
import { Redirect } from "react-router-dom";

class AddStudentToCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newStudent: {
        firstname: "",
        lastname: "",
        email: "",
        imageUrl: "",
        gpa: "",
        campusId: this.props.match.params.id, // Pre-fill campus ID
      },
      errors: [],
      redirect: false,
    };
  }

  // Fetch campus and students data when the component mounts
  componentDidMount() {
    const campusId = this.props.match.params.id;
    this.props.fetchCampus(campusId); // Fetch the campus details
    this.props.fetchAllStudents(); // Fetch all existing students
  }

  // Handle input changes for the new student form
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      newStudent: {
        ...prevState.newStudent,
        [name]: value,
      },
    }));
  };

  // Handle submitting a new student
  handleSubmitNewStudent = async (event) => {
    event.preventDefault();

    const studentData = {
      ...this.state.newStudent,
      gpa: this.state.newStudent.gpa === "" ? null : this.state.newStudent.gpa,
    };

    try {
      const newStudent = await this.props.addStudent(studentData);
      alert("New student successfully added to the campus!");
      this.setState({
        redirect: true,
      });
    } catch (errors) {
      if (Array.isArray(errors)) {
        this.setState({ errors });
      } else {
        alert(errors.message || "An unexpected error occurred.");
      }
    }
  };

  // Handle adding an existing student to the campus
  handleAddExistingStudent = async (studentId) => {
    const campusId = this.props.match.params.id;

    try {
      await this.props.editStudent({ id: studentId, campusId });
      alert("Student successfully added to the campus!");
      this.setState({
        redirect: true, // Redirect after adding the student
      });
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the student.");
    }
  };

  render() {
    // Redirect to the campus page after adding a student
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.props.match.params.id}`} />;
    }

    return (
      <div>
        <Header />
        <AddStudentToCampusView
          campus={this.props.campus || {}} // Ensure campus prop is always defined
          existingStudents={this.props.allStudents || []} // Pass allStudents correctly
          handleChange={this.handleChange}
          handleSubmitNewStudent={this.handleSubmitNewStudent}
          handleAddExistingStudent={this.handleAddExistingStudent}
          newStudent={this.state.newStudent}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus, // Campus data
    allStudents: state.allStudents, // All students data
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
    addStudent: (student) => dispatch(addStudentThunk(student)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
  };
};

export default connect(mapState, mapDispatch)(AddStudentToCampusContainer);
