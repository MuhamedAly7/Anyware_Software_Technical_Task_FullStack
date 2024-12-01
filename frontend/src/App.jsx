import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnnouncementForm from "./pages/AnnouncementForm";
import DueForm from "./pages/DueForm";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import AnnouncementUpdateForm from "./pages/AnnouncementUpdateForm";
import DueUpdateForm from "./pages/DueUpdateForm";
import AdmitAddingAccount from "./pages/AdminAddingAccount";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {user?.data?.role !== "student" && (
              <Route path="/addAnnouncement" element={<AnnouncementForm />} />
            )}
            {user?.data?.role !== "student" && user?.data.role !== "admin" && (
              <Route path="/addDue" element={<DueForm />} />
            )}

            {user?.data?.role !== "student" && (
              <Route
                path="/updateAnnouncement"
                element={<AnnouncementUpdateForm />}
              />
            )}
            {user?.data?.role !== "student" && user?.data.role !== "admin" && (
              <Route path="/updateDue" element={<DueUpdateForm />} />
            )}

            {user?.data?.role === "admin" && (
              <Route path="/accountAdd" element={<AdmitAddingAccount />} />
            )}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
