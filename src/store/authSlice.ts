import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, setAuthTokens } from "../services/authService"; // đổi tên logout ở đây để tránh mâu thuẫn
import { LoginResponse } from "../types/LoginResponseType"; // Đảm bảo bạn đã định nghĩa LoginResponse trong authTypes

// Định nghĩa trạng thái ban đầu
interface AuthState {
  user: {
    id: number;
    username: string;
    email: string;
    roles: string[];
  } | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Trạng thái ban đầu của auth
const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk cho đăng nhập
export const loginAsync = createAsyncThunk<
  LoginResponse,
  { username: string; password: string }
>("auth/login", async ({ username, password }) => {
  const response = await login(username, password);
  setAuthTokens(response.token, response.refreshToken); // Lưu token vào localStorage
  return response;
});

// Slice auth
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Đổi tên 'logout' trong slice thành logoutAction để tránh mâu thuẫn với 'logoutService'
    logoutAction: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          roles: action.payload.roles,
        };
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.loading = false;
        state.error = "Login failed";
      });
  },
});

export const { logoutAction, setError } = authSlice.actions;
export default authSlice.reducer;
