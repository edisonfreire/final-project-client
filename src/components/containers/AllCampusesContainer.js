/*==================================================
/src/components/containers\AllCampusesContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllCampusesThunk, deleteCampusThunk } from "../../store/thunks";
import { AllCampusesView } from "../views";

class AllCampusesContainer extends Component {
  // Get all campuses data from back-end database
  componentDidMount() {
    this.props.fetchAllCampuses();
  }

  // Render All Campuses view by passing all campuses data as props to the corresponding View component
  render() {
    return (
      <div>
        <Header />
        <AllCampusesView
          allCampuses={this.props.allCampuses}
          deleteCampus={this.props.deleteCampus} // Pass deleteCampus function as a prop
        />
      </div>
    );
  }
}

// Map state from Redux store to props
const mapState = (state) => {
  return {
    allCampuses: state.allCampuses,
  };
};

// Map dispatch actions to props
const mapDispatch = (dispatch) => {
  return {
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    deleteCampus: (id) => dispatch(deleteCampusThunk(id)), // Map deleteCampusThunk
  };
};

// Type check props
AllCampusesContainer.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  fetchAllCampuses: PropTypes.func.isRequired,
  deleteCampus: PropTypes.func.isRequired,
};

// Export store-connected container by default
export default connect(mapState, mapDispatch)(AllCampusesContainer);