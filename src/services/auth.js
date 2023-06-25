import axios from "axios";

const BASE_URL = "https://rich-rose-shoulder-pads.cyclic.app/api";
// const BASE_URL = "http://localhost:3030/api";

export const signUp = async (credentials) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signup`, credentials);
    return res;
  } catch (error) {
    return error.message;
  }
};

export const signIn = async (credentials) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/signin`, credentials);
    return res;
  } catch (error) {
    return error.message;
  }
};

export const singOut = async () => {
  const res = await axios.post(`${BASE_URL}/auth/logout`);
  return res;
};

export const updateUserData = async (updateData) => {
  const asArray = Object.entries(updateData);
  const filtered = asArray.filter(([key]) => key !== "_id");
  const justOne = Object.fromEntries(filtered);
  const { data } = await axios.patch(
    `${BASE_URL}/auth/user/${updateData._id}`,
    justOne,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "Access-Control-Expose-Headers": "Content-Range",
      },
    }
  );
  return data;
};

export const refreshUserToken = async () => {
  const { data } = await axios.post(`${BASE_URL}/auth`);
  return data;
};
