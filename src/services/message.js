import axios from "axios";
const BASE_URL = "https://rich-rose-shoulder-pads.cyclic.app/api";
// const BASE_URL = "http://localhost:3030/api";

export function leaveMessage(body) {
  return axios.post(`${BASE_URL}/message`, body, {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    },
  });
}
