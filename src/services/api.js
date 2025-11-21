import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// refresh token before request is sent
api.interceptors.request.use(async (config) => {
  // You can add logic here to check token expiry and refresh if needed
  return config;
}),
  (error) => {
    return Promise.reject(error);
  };

//handle response and errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await api.get("/auth/token");
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
