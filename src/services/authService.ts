// authService.ts
import axios from "../utils/axiosInstance";
import { LoginResponse } from "../types/LoginResponseType";

// Hàm gọi API login
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("/auth/signin", {
    username,
    password,
  });
  return response.data;
};

// Hàm gọi API refresh token
export const refreshToken = async (
  refreshToken: string
): Promise<{ token: string }> => {
  const response = await axios.post("/auth/refreshtoken", { refreshToken });
  return response.data;
};

// Lưu token và refreshToken vào localStorage
export const setAuthTokens = (token: string, refreshToken: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
};

// Lấy token và refreshToken từ localStorage
export const getAuthTokens = () => {
  return {
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
};

// Logout (xóa token khỏi localStorage)
export const logout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      await axios.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  } catch (error) {
    console.error("Error during logout API call:", error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }
};
