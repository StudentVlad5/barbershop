import axios from "axios";
const BASE_URL = "https://drab-pear-gazelle-belt.cyclic.app/api";
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
  const { data } = await axios.patch(`${BASE_URL}/user`, updateData);
  return data;
};

export const refreshUserToken = async () => {
  const { data } = await axios.post(`${BASE_URL}/auth`);
  return data;
};
