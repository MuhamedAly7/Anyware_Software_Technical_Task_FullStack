import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addDue, updateDue } from "../features/dues/dueSlice";
import { toast } from "react-toastify";

function DueUpdateForm() {
  const location = useLocation();

  const { id, dueTitle, dueTopic, dueDate, dueType, dueCourse } =
    location.state;

  const [UpdatedDueType, setUpdatedDueType] = useState("");
  const [UpdatedDueTitle, setUpdatedDueTitle] = useState("");
  const [UpdatedDueCourse, setUpdatedDueCourse] = useState("");
  const [UpdatedDueTopic, setUpdatedDueTopic] = useState("");
  const [UpdatedDueDate, setUpdatedDueDate] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatedDueType(dueType);
    setUpdatedDueTitle(dueTitle);
    setUpdatedDueCourse(dueCourse);
    setUpdatedDueTopic(dueTopic);
    setUpdatedDueDate(dueDate);
  }, []);

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
      dispatch(
        updateDue({
          id,
          UpdatedDueType,
          UpdatedDueTitle,
          UpdatedDueCourse,
          UpdatedDueTopic,
          UpdatedDueDate,
        })
      );
      setUpdatedDueType("");
      setUpdatedDueTitle("");
      setUpdatedDueCourse("");
      setUpdatedDueTopic("");
      setUpdatedDueDate("");
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
              value={UpdatedDueType}
              onChange={(e) => setUpdatedDueType(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">title</label>
            <input
              type="text"
              name="dueTitle"
              id="dueTitle"
              value={UpdatedDueTitle}
              onChange={(e) => setUpdatedDueTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Course</label>
            <input
              type="text"
              name="dueCourse"
              id="dueCourse"
              value={UpdatedDueCourse}
              onChange={(e) => setUpdatedDueCourse(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Topic</label>
            <input
              type="text"
              name="dueTopic"
              id="dueTopic"
              value={UpdatedDueTopic}
              onChange={(e) => setUpdatedDueTopic(e.target.value)}
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
              value={UpdatedDueDate}
              onChange={(e) => setUpdatedDueDate(e.target.value)}
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

export default DueUpdateForm;
