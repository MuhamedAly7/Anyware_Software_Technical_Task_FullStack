import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDue } from "../features/dues/dueSlice";
import { toast } from "react-toastify";

function DueForm() {
  const [dueType, setDueType] = useState("");
  const [dueTitle, setDueTitle] = useState("");
  const [dueCourse, setDueCourse] = useState("");
  const [dueTopic, setDueTopic] = useState("");
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !dueType.trim() ||
      !dueTitle.trim() ||
      !dueCourse.trim() ||
      !dueTopic.trim() ||
      !dueDate.trim() ||
      !["quiz", "assignment"].includes(dueType)
    ) {
      toast.error("someting missing/wrong in form");
    } else {
      dispatch(addDue({ dueType, dueTitle, dueCourse, dueTopic, dueDate }));
      setDueType("");
      setDueTitle("");
      setDueCourse("");
      setDueTopic("");
      setDueDate("");
      navigate("/");
    }
  };

  return (
    <>
      <div>
        <h1>Add Due</h1>
      </div>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">type (quiz/assignment)</label>
            <input
              type="text"
              name="dueType"
              id="dueType"
              value={dueType}
              onChange={(e) => setDueType(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">title</label>
            <input
              type="text"
              name="dueTitle"
              id="dueTitle"
              value={dueTitle}
              onChange={(e) => setDueTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Course</label>
            <input
              type="text"
              name="dueCourse"
              id="dueCourse"
              value={dueCourse}
              onChange={(e) => setDueCourse(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Topic</label>
            <input
              type="text"
              name="dueTopic"
              id="dueTopic"
              value={dueTopic}
              onChange={(e) => setDueTopic(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">
              Date (must be like 20 Dec 2020-09:00PM)
            </label>
            <input
              type="text"
              name="dueDate"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Add Due
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default DueForm;
