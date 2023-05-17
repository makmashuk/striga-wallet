import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://localhost:3030/",
});

export default apiClient;
