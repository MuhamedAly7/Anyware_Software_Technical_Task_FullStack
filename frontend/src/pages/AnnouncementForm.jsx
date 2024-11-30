import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAnnouncement } from "../features/announcements/announcementSlice";
import { toast } from "react-toastify";

function AnnouncementForm() {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim() || !description.trim()) {
      toast.error("Please fill all form");
    } else {
      dispatch(addAnnouncement({ topic, description }));
      setTopic("");
      setDescription("");
      navigate("/");
    }
  };

  return (
    <>
      <div>
        <h1 className="">Add Announcement</h1>
      </div>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Topic</label>
            <input
              type="text"
              name="topic"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Add Announcement
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AnnouncementForm;
