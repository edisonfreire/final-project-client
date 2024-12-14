/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching,
and passes data (if any) as props to the corresponding View component.
It also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";
import { Redirect } from "react-router-dom";
import EditCampusView from "../views/EditCampusView";

class EditCampusContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);

    // Check if campus data is passed in props (from Link state)
    const campus = this.props.location.state?.campus || {};
    this.state = {
      name: campus.name || "",
      address: campus.address || "",
      description: campus.description || "",
      imageUrl: campus.imageUrl || "",
      redirect: false,
      redirectId: null,
      isLoading: !campus.name, // If no campus data is passed, start in loading state
    };
  }

  // Fetch campus data if not passed via props
  async componentDidMount() {
    if (!this.state.name) {
      const { id } = this.props.match.params; // Get ID from URL params
      try {
        const campus = await this.props.fetchCampus(id); // Fetch campus data
        this.setState({
          name: campus.name,
          address: campus.address,
          description: campus.description,
          imageUrl: campus.imageUrl,
          isLoading: false, // Stop loading once data is fetched
        });
      } catch (err) {
        console.error("Error fetching campus data:", err);
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

    // Prepare updated campus data
    const updatedCampus = {
      id: this.props.match.params.id,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
    };

    // Dispatch the editCampusThunk
    await this.props.editCampus(updatedCampus);

    // Redirect to the updated campus's page
    this.setState({
      redirect: true,
      redirectId: updatedCampus.id,
    });
  };

  render() {
    // Redirect after successful submission
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.state.redirectId}`} />;
    }

    // Show a loading message while data is being fetched
    if (this.state.isLoading) {
      return <p>Loading campus details...</p>;
    }

    // Render the Edit Campus view
    return (
      <div>
        <Header />
        <EditCampusView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          campus={this.state} // Pass campus details as props
        />
      </div>
    );
  }
}

// Map Redux state to props
const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

// Map Redux actions to props
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);
