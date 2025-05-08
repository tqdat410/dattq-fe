import axios from "axios";
import {
  getAuthTokens,
  setAuthTokens,
  refreshToken,
} from "../services/authService";

// Tạo instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // thay đổi nếu cần
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;

// Khai báo chính xác kiểu TypeScript cho queue
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}[] = [];

// Hàm xử lý queue khi token đã refresh xong
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Thêm token vào mỗi request nếu có
axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = getAuthTokens();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý refresh token nếu bị 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken: storedRefreshToken } = getAuthTokens();

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      storedRefreshToken
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const data = await refreshToken(storedRefreshToken);
        setAuthTokens(data.token, storedRefreshToken);
        axiosInstance.defaults.headers.common["Authorization"] =
          "Bearer " + data.token;
        processQueue(null, data.token);
        originalRequest.headers["Authorization"] = "Bearer " + data.token;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
