import axios from "axios";
import { redirectToNotFound } from "./redirect";
import { signOut } from "next-auth/react";

const axiosInstance = axios.create({
  // baseURL: "https://api.trulynk.org",
  baseURL: "https://apitrack.psiborg.io",
  // baseURL: "http://localhost:5000",
});

const requestInterceptor = axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = "";
    if (accessToken) {
      request.headers["Authorization"] = "Bearer " + accessToken;
      request.headers["Content-Type"] = "application/json";
    }
    return request;
  },
  (error) => {
    throw error;
  }
);

const responseInterceptor = axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error?.config;
    if (error?.response?.status == 401) {
      originalRequest.sent = true;

      // Redirect to /not-found page
      redirectToNotFound();
    }
    throw error;
  }
);

export default axiosInstance;
