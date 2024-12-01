import axios from "axios";

const API_URL = "http://localhost:4000/api";

const addAnnouncement = async (announcementData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "/announcements",
    announcementData,
    config
  );
  return response.data;
};

const getAnnouncements = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/announcements", config);
  return response.data;
};

const deleteAnnouncement = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(token);
  console.log(id);
  const response = await axios.patch(
    API_URL + `/announcements/${id}/soft_delete`,
    "",
    config
  );
  return response.data;
};

const updateAnnouncement = async (announcementData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { id, topic, description } = announcementData;
  console.log(token);
  console.log(id);
  console.log(topic);
  console.log(description);

  const response = await axios.patch(
    API_URL + `/announcements/${id}/update`,
    { topic, description },
    config
  );
  return response.data;
};

const announcementService = {
  addAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
  updateAnnouncement,
};

export default announcementService;
