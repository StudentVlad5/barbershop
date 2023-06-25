import axios from "axios";
import PropTypes from "prop-types";

// const { BASE_URL } = window.global;
const BASE_URL = "https://rich-rose-shoulder-pads.cyclic.app/api";
// const BASE_URL = 'http://localhost:3030/api';

async function fetchData(pathParams) {
  const axiosInstance = axios.create({
    baseURL: `${BASE_URL}${pathParams}`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });

  return await axiosInstance.get();
}

async function updateUserData(pathParams, body, file) {
  const formData = new FormData();
  file && formData.set("avatar", file);
  formData.append("email", body.email);
  formData.append("birthday", body.birthday);
  formData.append("location", body.location);
  formData.append("phone", body.phone);
  formData.append("role", body.role);
  formData.append("userName", body.userName);

  return await axios.patch(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

async function createUserData(pathParams, body, file) {
  const formData = new FormData();
  file && formData.set("avatar", file);
  formData.append("userName", body.userName);
  formData.append("email", body.email);
  formData.append("password", body.password);
  formData.append("phone", body.phone);
  formData.append("birthday", body.birthday);
  formData.append("location", body.location);
  formData.append("role", body.role);

  return await axios.post(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

async function updateServiceData(pathParams, body) {
  const formData = new FormData();
  formData.append("subject", body.subject);
  formData.append("time", body.time);
  formData.append("location", body.location);
  formData.append("price", body.price);
  formData.append("owner", body.owner);

  return await axios.patch(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}
async function createServiceData(pathParams, body) {
  const formData = new FormData();
  formData.append("subject", body.subject);
  formData.append("time", body.time);
  formData.append("location", body.location);
  formData.append("price", body.price);
  formData.append("owner", body.owner);
  formData.append("Id", body.id);

  return await axios.post(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

async function createOwnerData(pathParams, body, file) {
  const formData = new FormData();
  file && formData.set("avatar", file);
  formData.append("startHour", body.startHour);
  formData.append("endHour", body.endHour);
  formData.append("designation", body.designation);
  formData.append("workDays", body.workDays);
  formData.append("groupId", body.groupId);
  formData.append("ownerColor", body.ownerColor);
  formData.append("ownerText", body.ownerText);
  formData.append("Id", body.id);

  return await axios.post(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

async function updateOwnerData(pathParams, body, file) {
  const formData = new FormData();
  file && formData.set("avatar", file);
  formData.append("ownerText", body.ownerText);
  formData.append("ownerColor", body.ownerColor);
  formData.append("designation", body.designation);
  formData.append("workDays", body.workDays);
  formData.append("startHour", body.startHour);
  formData.append("endHour", body.endHour);
  formData.append("groupId", body.groupId);

  return await axios.patch(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

async function deleteData(pathParams) {
  const formData = new FormData();
  return axios.delete(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

async function changePassword(pathParams, body) {
  const formData = new FormData();
  formData.append("password", body);
  return axios.patch(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Expose-Headers": "Content-Range",
    },
  });
}

fetchData.propTypes = {
  pathParams: PropTypes.string.isRequired,
};

deleteData.propTypes = {
  pathParams: PropTypes.string.isRequired,
};

updateUserData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
  file: PropTypes.string,
};

createUserData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
  file: PropTypes.string,
};

updateServiceData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

createServiceData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

createOwnerData.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
};

export {
  fetchData,
  updateUserData,
  createUserData,
  updateOwnerData,
  createServiceData,
  updateServiceData,
  deleteData,
  createOwnerData,
  changePassword,
};
