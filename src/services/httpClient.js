import axios from "axios";
import { clearAuth } from "../shared/utils";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

const redirectToLogin = () => {
  window.location.href = "/login";
};

const logoutRequest = async () => {
  try {
    await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      { withCredentials: true },
    );
  } catch (error) {
    console.error("Logout request failed:", error);
  }
};

api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (status === 406) {
      await logoutRequest();
      clearAuth();
      redirectToLogin();
      return Promise.reject(error);
    }

    if (status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          })
          .catch((queueError) => Promise.reject(queueError));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const refreshResponse = await axios.post(
          "http://localhost:3000/api/auth/refresh",
          { refreshToken },
          { withCredentials: true },
        );

        const newAuthToken = refreshResponse?.data?.authToken;

        if (!newAuthToken) {
          throw new Error("Refresh token response does not contain authToken");
        }

        localStorage.setItem("authToken", newAuthToken);

        api.defaults.headers.common.Authorization = `Bearer ${newAuthToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAuthToken}`;

        processQueue(null, newAuthToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await logoutRequest();
        clearAuth();
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

const request = async (config) => {
  const response = await api(config);
  return response.data;
};

const httpClient = {
  get: (url, config = {}) =>
    request({
      url,
      method: "GET",
      ...config,
    }),

  post: (url, data = {}, config = {}) =>
    request({
      url,
      method: "POST",
      data,
      ...config,
    }),

  put: (url, data = {}, config = {}) =>
    request({
      url,
      method: "PUT",
      data,
      ...config,
    }),

  patch: (url, data = {}, config = {}) =>
    request({
      url,
      method: "PATCH",
      data,
      ...config,
    }),

  delete: (url, config = {}) =>
    request({
      url,
      method: "DELETE",
      ...config,
    }),
};

export default httpClient;
