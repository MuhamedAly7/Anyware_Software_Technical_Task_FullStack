import axios from "axios";

const API_URL = "https://anyware-software-technical-task-full-stack.vercel.app";

// Signup
const signup = async (userData) => {
  const response = await axios.post(API_URL + "/api/auth/signup", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem("user");
};

// Login
const login = async (userData) => {
  const response = await axios.post(API_URL + "/api/auth/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  signup,
  logout,
  login,
};

export default authService;
