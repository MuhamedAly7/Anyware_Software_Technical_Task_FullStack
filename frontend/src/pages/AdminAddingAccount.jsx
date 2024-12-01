import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { signup, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function AdmitAddingAccount() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    password_conformation: "",
    role: "student",
  });

  const { name, username, password, password_confirmation, role } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !username.trim) {
      toast.error("Please fill all fields");
    }
    if (password !== password_confirmation) {
      toast.error("Password to not match!");
    } else if (!["student", "instructor"].includes(role)) {
      toast.error("Not supported role!");
    } else {
      const userData = {
        name,
        username,
        password,
        password_confirmation,
        role,
      };
      dispatch(signup(userData));
      navigate("/");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Signup
        </h1>
        <p>Please create an account</p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password_confirmation"
              name="password_confirmation"
              value={password_confirmation}
              placeholder="password confirmation"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">type (student/instructor)</label>
            <input
              type="text"
              className="form-control"
              id="role"
              name="role"
              value={role}
              placeholder="Role"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Add New User
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AdmitAddingAccount;
