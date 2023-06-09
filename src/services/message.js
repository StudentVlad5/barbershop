import axios from "axios";
const BASE_URL = "https://drab-pear-gazelle-belt.cyclic.app/api";
// const BASE_URL = "http://localhost:3030/api";

// export const leaveMessage = async (credentials) => {
//   try {
//     const res = await axios.post(`${BASE_URL}/message`, credentials);
//     console.log("res", res);
//     return res;
//   } catch (error) {
//     return error.message;
//   }
// };

export function leaveMessage(body) {
  return axios.post(`${BASE_URL}/message`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    },
  });
}
