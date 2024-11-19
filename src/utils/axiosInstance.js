import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000", // Backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error logging
    console.error("Axios error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
