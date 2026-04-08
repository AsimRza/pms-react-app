import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { clearAuth } from "../shared/utils";

export type HttpClientConfig = AxiosRequestConfig;

export interface IHttpClientMetaResponse<T = unknown> {
  data: T;
  headers: AxiosResponse["headers"];
}

export interface IHttpClient {
  get: <T = unknown>(url: string, config?: HttpClientConfig) => Promise<T>;
  getWithMeta: <T = unknown>(
    url: string,
    config?: HttpClientConfig,
  ) => Promise<IHttpClientMetaResponse<T>>;
  post: <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: HttpClientConfig,
  ) => Promise<T>;
  put: <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: HttpClientConfig,
  ) => Promise<T>;
  patch: <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: HttpClientConfig,
  ) => Promise<T>;
  delete: <T = unknown>(url: string, config?: HttpClientConfig) => Promise<T>;
}

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string | null) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
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
  (config: any) => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error: unknown) => Promise.reject(error),
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
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
        return new Promise<string | null>((resolve, reject) => {
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

const request = async <T = unknown>(config: HttpClientConfig): Promise<T> => {
  const response = await api(config);
  return response.data as T;
};

const httpClient: IHttpClient = {
  get: <T = unknown>(url: string, config: HttpClientConfig = {}) =>
    request<T>({
      url,
      method: "GET",
      ...config,
    }),

  getWithMeta: async <T = unknown>(
    url: string,
    config: HttpClientConfig = {},
  ): Promise<IHttpClientMetaResponse<T>> => {
    const response = await api({ url, method: "GET", ...config });
    return {
      data: response.data as T,
      headers: response.headers,
    };
  },

  post: <T = unknown, D = unknown>(
    url: string,
    data: D = {} as D,
    config: HttpClientConfig = {},
  ) =>
    request<T>({
      url,
      method: "POST",
      data,
      ...config,
    }),

  put: <T = unknown, D = unknown>(
    url: string,
    data: D = {} as D,
    config: HttpClientConfig = {},
  ) =>
    request<T>({
      url,
      method: "PUT",
      data,
      ...config,
    }),

  patch: <T = unknown, D = unknown>(
    url: string,
    data: D = {} as D,
    config: HttpClientConfig = {},
  ) =>
    request<T>({
      url,
      method: "PATCH",
      data,
      ...config,
    }),

  delete: <T = unknown>(url: string, config: HttpClientConfig = {}) =>
    request<T>({
      url,
      method: "DELETE",
      ...config,
    }),
};

export default httpClient;
