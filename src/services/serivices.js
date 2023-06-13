import axios from "axios";
const BASE_URL = "https://drab-pear-gazelle-belt.cyclic.app/api";
// const BASE_URL = "http://localhost:3030/api";

export function getServices() {
  return axios.get(`${BASE_URL}/admin/services`, {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    },
  });
}
