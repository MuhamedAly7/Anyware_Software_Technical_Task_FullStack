import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateAnnouncement } from "../features/announcements/announcementSlice";
import { toast } from "react-toastify";

function AnnouncementUpdateForm() {
  const location = useLocation();
  const { id, topic, description } = location.state || {};
  const [updatedTopic, setUpdatedTopic] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatedTopic(topic);
    setUpdatedDescription(description);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim() || !description.trim()) {
      toast.error("Please fill all form");
    } else {
      dispatch(updateAnnouncement({ id, updatedTopic, updatedDescription }));
      setUpdatedTopic("");
      setUpdatedDescription("");
      navigate("/");
    }
  };

  return (
    <>
      <div>
        <h1 className="">Update Announcement</h1>
      </div>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Topic</label>
            <input
              type="text"
              name="topic"
              id="topic"
              value={updatedTopic}
              onChange={(e) => setUpdatedTopic(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Update Announcement
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AnnouncementUpdateForm;
