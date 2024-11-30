import { useDispatch, useSelector } from "react-redux";
import { deleteAnnouncement } from "../features/announcements/announcementSlice";
import { useNavigate } from "react-router-dom";
function AnnouncementItem({
  id,
  creator,
  topic,
  description,
  creatorName,
  onUpdate,
  onDelete,
}) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="announcement-item">
      <div className="announcement-left">
        <img
          src="https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
          alt={topic}
          className="announcement-photo"
        />
        <h4 className="announcement-topic">{creatorName}</h4>
      </div>
      <div className="announcement-right">
        <p className="announcement-description">{topic}</p>
        <span className="announcement-creator">{description}</span>
      </div>
      <div className="announcement-actions">
        {user?.data?.id === creator && (
          <button className="btn-update" onClick={onUpdate}>
            Update
          </button>
        )}
        {user?.data?.id === creator || user?.data?.role === "admin" ? (
          <button
            className="btn-delete"
            onClick={() => {
              dispatch(deleteAnnouncement(id));
            }}
          >
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AnnouncementItem;