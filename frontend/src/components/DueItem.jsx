import { useDispatch, useSelector } from "react-redux";
import { deleteDue } from "../features/dues/dueSlice";
import { useNavigate } from "react-router-dom";

const DueItem = ({
  id,
  instructor,
  dueTitle,
  dueTopic,
  dueType,
  dueDate,
  dueCourse,
}) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getDueIcon = () => {
    if (dueType === "quiz") {
      return "📋";
    } else if (dueType === "assignment") {
      return "📝";
    } else {
      return "❓";
    }
  };

  return (
    <div className={`due-item due-item-${dueType}`}>
      <div className="due-left">
        <span className="due-icon">{getDueIcon()}</span>
        <div className="due-details">
          <h4 className="due-title">{dueTitle}</h4>
          <p className="due-topic">{dueTopic}</p>
          <span className="due-type">{dueType}</span>
          <span className="due-type">{dueDate}</span>
        </div>
      </div>
      <div className="due-actions">
        {user?.data?.id === instructor && (
          <button
            className="btn-update"
            onClick={() => {
              const props = {
                id: id,
                dueTitle: dueTitle,
                dueTopic: dueTopic,
                dueType: dueType,
                dueDate: dueDate,
                dueCourse: dueCourse,
              };
              navigate("/updateDue", { state: props });
            }}
          >
            Update
          </button>
        )}
        {user?.data?.id === instructor || user?.data?.role === "admin" ? (
          <button
            className="btn-delete"
            onClick={() => dispatch(deleteDue(id))}
          >
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DueItem;
