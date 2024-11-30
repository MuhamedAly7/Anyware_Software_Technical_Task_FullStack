import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/route2">Schedule</Link>
        </li>
        <li>
          <Link to="/route3">Courses</Link>
        </li>
        <li>
          <Link to="/route4">Gradebook</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
