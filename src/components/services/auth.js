import axios from "axios";

export const signUp = async (credentials) => {
  try {
    const res = await axios.post("/auth/signup", credentials);
    return res;
  } catch (error) {
    return error.message;
  }
};

export const signIn = async (credentials) => {
  try {
    const res = await axios.post("/auth/signin", credentials);
    return res;
  } catch (error) {
    return error.message;
  }
};

export const singOut = async () => {
  const res = await axios.post("/auth/logout");
  return res;
};

export const updateUserData = async (updateData) => {
  const { data } = await axios.patch("/user", updateData);
  return data;
};

export const refreshUserToken = async () => {
  const { data } = await axios.post("/auth");
  return data;
};
