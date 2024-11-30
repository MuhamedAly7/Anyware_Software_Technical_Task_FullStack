import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getAnnouncements } from "../features/announcements/announcementSlice";
import isTokenExpired from "../utils/checkToken";
import { remove } from "../features/auth/authSlice";
import { getDues } from "../features/dues/dueSlice";
import AnnouncementItem from "../components/AnnouncementItem";
import Intro from "../components/Intro";
import Sidebar from "../components/Sidebar";
import DueItem from "../components/DueItem";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { announcements, isLoading, isError, message } = useSelector(
    (state) => state.announcement
  );
  const { dues } = useSelector((state) => state.due);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (isTokenExpired(user?.data.token || "")) {
      navigate("/login");
      console.log("yes");
      return () => {
        dispatch(remove());
      };
    } else {
      console.log("no");
    }

    dispatch(getAnnouncements());
    dispatch(getDues());

    console.log(dues);
    console.log(announcements);
    // return () => {
    //   dispatch(reset());
    // };
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="dashboard">
        {/* Sidebar */}
        <Sidebar />

        <main className="main-content">
          <Intro />
          {/* Announcements and Dues Section */}
          <section className="dashboard-sections">
            <div className="announcements">
              <div className="announceTitle">
                <h2>Announcements</h2>
                {user?.data?.role !== "student" && (
                  <Link to="/addAnnouncement" className="add_announce">
                    +
                  </Link>
                )}
              </div>
              <ul>
                {announcements?.data?.map((announcement) => (
                  <AnnouncementItem
                    id={announcement._id}
                    creator={announcement.creator}
                    topic={announcement.topic}
                    description={announcement.description}
                    creatorName={announcement.creatorName}
                    key={announcement._id}
                  />
                ))}
              </ul>
            </div>
            <div className="dues">
              <div className="dueTitle">
                <h2>Dues</h2>
                {user?.data?.role !== "student" &&
                  user?.data.role !== "admin" && (
                    <Link to="/addDue" className="add_due">
                      +
                    </Link>
                  )}
              </div>
              <ul>
                {dues?.data?.map((due) => (
                  <DueItem
                    key={due._id}
                    id={due._id}
                    dueTitle={due.dueTitle}
                    dueTopic={due.dueTopic}
                    dueType={due.dueType}
                    dueDate={due.dueDate}
                    instructor={due.instructor}
                  />
                ))}
              </ul>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
