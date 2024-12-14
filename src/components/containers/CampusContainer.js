/*==================================================
CampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
/*==================================================
CampusContainer.js
==================================================*/
import Header from "./Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchCampusThunk,
  deleteCampusThunk,
  editStudentThunk,
} from "../../store/thunks";
import { Redirect } from "react-router-dom";

import { CampusView } from "../views";

class CampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false, // Used to handle redirection after deletion
      addStudentRedirect: false, // Redirect for Add Student functionality
    };
  }

  // Fetch the campus data when the component mounts
  componentDidMount() {
    const { id } = this.props.match.params; // Get campus ID from the URL
    this.props.fetchCampus(id);
  }

  // Handle deleting a campus and redirecting to All Campuses view
  handleDeleteCampus = (id) => {
    this.props.deleteCampus(id); // Delete the campus
    this.setState({ redirect: true }); // Trigger redirect after deletion
  };

  // Redirect to Add Student to Campus page
  handleAddStudent = () => {
    this.setState({ addStudentRedirect: true });
  };

  // Handle removing a student from the campus by setting campusId to null
  handleRemoveStudentFromCampus = async (studentId) => {
    const campusId = this.props.match.params.id;

    try {
      // Set the student's campusId to null
      await this.props.editStudent({ id: studentId, campusId: null });

      // Fetch the updated campus data
      await this.props.fetchCampus(campusId);

      alert("Student removed from campus!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while removing the student from the campus.");
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/campuses" />; // Redirect to All Campuses view
    }

    if (this.state.addStudentRedirect) {
      return <Redirect to={`/campus/${this.props.campus.id}/add-student`} />; // Redirect to Add Student page
    }

    return (
      <div>
        <Header />
        <CampusView
          campus={this.props.campus}
          deleteCampus={this.handleDeleteCampus}
          removeStudentFromCampus={this.handleRemoveStudentFromCampus}
          handleAddStudent={this.handleAddStudent}
        />
      </div>
    );
  }
}

// Map state to props
const mapState = (state) => {
  return {
    campus: state.campus, // Campus data
  };
};

// Map dispatch functions to props
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    deleteCampus: (id) => dispatch(deleteCampusThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)), // Use editStudentThunk to update campusId
  };
};

// Export the connected container
export default connect(mapState, mapDispatch)(CampusContainer);
