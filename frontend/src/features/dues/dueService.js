import axios from "axios";

const API_URL =
  "https://anyware-software-technical-task-full-stack.vercel.app";

const addDue = async (dueData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "/api/dues", dueData, config);
  // console.log(response.data);
  return response.data;
};

const getDues = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/api/dues", config);
  // console.log(response.data);
  return response.data;
};

const deleteDue = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(token);
  console.log(id);
  const response = await axios.patch(
    API_URL + `/api/dues/${id}/soft_delete`,
    "",
    config
  );
  return response.data;
};

const updateDue = async (dueData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // console.log(dueData);
  // return;
  const { id, dueType, dueTopic, dueTitle, dueDate, dueCourse } = dueData;

  const response = await axios.patch(
    API_URL + `/api/dues/${id}/update`,
    { dueType, dueTopic, dueTitle, dueDate, dueCourse },
    config
  );
  // console.log(response.data);
  return response.data;
};

const dueService = {
  addDue,
  getDues,
  deleteDue,
  updateDue,
};

export default dueService;
