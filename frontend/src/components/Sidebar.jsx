import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          {user?.data?.role === "admin" && (
            <Link to="/accountAdd">Add account</Link>
          )}
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
