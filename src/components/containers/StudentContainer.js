/*==================================================
StudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentThunk, deleteStudentThunk } from "../../store/thunks";
import { StudentView } from "../views";
import { Redirect } from "react-router-dom";

class StudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false, // Used to handle redirection after deletion
      editRedirect: false, // Used to handle redirection to the Edit Student page
    };
  }

  // Fetch student data from the back-end when the component mounts
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStudent(id);
  }

  // Handle deleting a student
  handleDeleteStudent = (id) => {
    this.props.deleteStudent(id); // Delete the student
    this.setState({ redirect: true }); // Trigger redirect after deletion
  };

  // Redirect to Edit Student View
  handleEditStudent = () => {
    this.setState({ editRedirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/students" />; // Redirect to All Students view
    }

    if (this.state.editRedirect) {
      return <Redirect to={`/student/${this.props.student.id}/edit`} />; // Redirect to Edit Student view
    }

    return (
      <div>
        <Header />
        <StudentView
          student={this.props.student}
          deleteStudent={this.handleDeleteStudent}
          handleEditStudent={this.handleEditStudent}
        />
      </div>
    );
  }
}

// Map state from Redux store to props
const mapState = (state) => {
  return {
    student: state.student, // Get the State object from Reducer "student"
  };
};

// Map dispatch functions to props
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    deleteStudent: (id) => dispatch(deleteStudentThunk(id)),
  };
};

export default connect(mapState, mapDispatch)(StudentContainer);
