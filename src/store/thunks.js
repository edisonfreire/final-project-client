/*==================================================
/src/store/thunks.js

It contains all Thunk Creators and Thunks.
================================================== */
import * as ac from "./actions/actionCreators"; // Import Action Creators ("ac" keyword Action Creator)
const axios = require("axios");

//All Campuses
// THUNK CREATOR:
export const fetchAllCampusesThunk = () => async (dispatch) => {
  // The THUNK
  try {
    // API "get" call to get "campuses" data from database
    let res = await axios.get(`/api/campuses`);
    // Call Action Creator to return Action object (type + payload with "campuses" data)
    // Then dispatch the Action object to Reducer to update state
    dispatch(ac.fetchAllCampuses(res.data));
  } catch (err) {
    console.error(err);
  }
};

// Single Campus
// THUNK CREATOR:
export const fetchCampusThunk = (id) => async (dispatch) => {
  // The THUNK
  try {
    // API "get" call to get a student data (based on "id")from database
    let res = await axios.get(`/api/campuses/${id}`);
    dispatch(ac.fetchCampus(res.data));
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// Add Campus
export const addCampusThunk = (campus) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/campuses`, campus);
    dispatch({
      type: "ADD_CAMPUS",
      payload: response.data,
    });
    return response.data;
  } catch (err) {
    // Check if it's a validation error
    if (err.response?.status === 400 && err.response?.data?.errors) {
      // Return validation errors as an array
      throw err.response.data.errors;
    }
    // Handle other errors
    console.error("Unexpected Error:", err);
    throw new Error("Failed to add campus.");
  }
};

// Delete Campus Thunk
export const deleteCampusThunk = (campusId) => async (dispatch) => {
  try {
    // API call to delete campus by ID
    await axios.delete(`/api/campuses/${campusId}`);
    dispatch({
      type: "DELETE_CAMPUS", // Action type for deleting a campus
      payload: campusId,
    });
  } catch (error) {
    console.error(error);
  }
};

export const editCampusThunk = (campus) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/campuses/${campus.id}`, campus);
    dispatch({
      type: "EDIT_CAMPUS",
      payload: response.data,
    });
  } catch (err) {
    console.error(err);
  }
};

// All Students
// THUNK CREATOR:
export const fetchAllStudentsThunk = () => async (dispatch) => {
  // The THUNK
  try {
    // API "get" call to get "students" data from database
    let res = await axios.get(`/api/students`);
    // Call Action Creator to return Action object (type + payload with "students" data)
    // Then dispatch the Action object to Reducer to update state
    dispatch(ac.fetchAllStudents(res.data));
  } catch (err) {
    console.error(err);
  }
};

// Add Student
// THUNK CREATOR:
export const addStudentThunk = (student) => async (dispatch) => {
  // The THUNK
  try {
    // API "post" call to add "student" object's data to database
    let res = await axios.post(`/api/students`, student);
    // Call Action Creator to return Action object (type + payload with new students data)
    // Then dispatch the Action object to Reducer to update state
    dispatch(ac.addStudent(res.data));
    return res.data;
  } catch (err) {
    if (err.response?.status === 400 && err.response?.data?.errors) {
      // Return validation errors as an array
      throw err.response.data.errors;
    }
    console.error("Unexpected Error:", err);
    throw new Error("Failed to add student.");
  }
};

// Delete Student
// THUNK CREATOR:
export const deleteStudentThunk = (studentId) => async (dispatch) => {
  try {
    // API "delete" call to delete student by ID
    await axios.delete(`/api/students/${studentId}`);
    // Dispatch DELETE_STUDENT action
    dispatch({
      type: "DELETE_STUDENT",
      payload: studentId,
    });
  } catch (err) {
    console.error(err);
  }
};

// Edit Student
// THUNK CREATOR:
export const editStudentThunk = (student) => async (dispatch) => {
  // The THUNK
  try {
    // API "put" call to update student (based on "id" and "student" object's data) from database
    let updatedStudent = await axios.put(
      `/api/students/${student.id}`,
      student,
    );
    // Update successful so change state with dispatch
    dispatch(ac.editStudent(updatedStudent));
  } catch (err) {
    if (err.response?.status === 400 && err.response?.data?.errors) {
      // Return validation errors as an array
      throw err.response.data.errors;
    }
    console.error("Unexpected Error:", err);
    throw new Error("Failed to edit student.");
  }
};

// Single Student
// THUNK CREATOR:
export const fetchStudentThunk = (id) => async (dispatch) => {
  // The THUNK
  try {
    // API "get" call to get a specific student (based on "id") data from database
    let res = await axios.get(`/api/students/${id}`);
    // Call Action Creator to return Action object (type + payload with student data)
    // Then dispatch the Action object to Reducer to display student data
    dispatch(ac.fetchStudent(res.data));
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
