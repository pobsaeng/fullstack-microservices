import axios from "axios";
import { setHeaders } from "./setHeaders";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
console.log("Environment URL : " + api.getUri());

export const getRequest = async (path) => {
  try {
    const headers = setHeaders();
    if (!headers) throw new Error("Headers missing or invalid");

    const response = await api.get(path, { headers });
    return response.data;
  } catch (error) {
    console.error("Error in GET request:", error.response.data);
    throw error;
  }
};

export const postRequest = async (path, data) => {
  try {
    const headers = setHeaders();
    if (!headers) throw new Error("Headers missing or invalid");

    const response = await api.post(path, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

export const putRequest = async (path, data) => {
  try {
    const headers = setHeaders();
    if (!headers) throw new Error("Headers missing or invalid");

    const response = await api.put(path, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error in PUT request:", error.message);
    throw error;
  }
};

export const deleteRequest = async (path) => {
  try {
    const headers = setHeaders();
    if (!headers) throw new Error("Headers missing or invalid");

    await api.delete(path, { headers });
  } catch (error) {
    console.error("Error in DELETE request:", error.error);
    throw error;
  }
};

export default api;