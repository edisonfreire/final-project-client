/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  const { allCampuses, deleteCampus } = props;

  // If there are no campuses, display an informative message
  if (!allCampuses.length) {
    return (
      <div>
        <p>There are no campuses.</p>
        <Link to={`newcampus`}>
          <button>Add New Campus</button>
        </Link>
      </div>
    );
  }

  // If there are campuses, render the list
  return (
    <div>
      <h1>All Campuses</h1>

      {allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
            <img
              src={campus.imageUrl || "/default.jpg"}
              alt={campus.name}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </Link>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <button onClick={() => deleteCampus(campus.id)}>Delete</button>
          <hr />
        </div>
      ))}
      <br />
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br />
      <br />
    </div>
  );
};

export default AllCampusesView;
