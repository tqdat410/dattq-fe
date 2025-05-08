import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../store/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { LoginResponse } from "../../types/LoginResponseType";

interface LoginPopupProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch: ThunkDispatch<any, unknown, any> = useDispatch();

  const handleSubmit = async () => {
    try {
      // Gửi yêu cầu đăng nhập và nhận dữ liệu trả về
      const loginResponse: LoginResponse = await dispatch(
        loginAsync({ username, password })
      ).unwrap(); // unwrap giúp bạn lấy dữ liệu trả về từ action

      // Nếu đăng nhập thành công
      if (loginResponse) {
        console.log("Login success:", loginResponse);
        onLoginSuccess(); // gọi callback khi đăng nhập thành công
      }
    } catch (err) {
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96 relative border-charcoal border-2">
        <h2 className="text-xl font-bold mb-4 text-charcoal">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-charcoal border-2 w-full mb-2 px-3 py-2 rounded text-charcoal"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-charcoal border-2 w-full mb-4 px-3 py-2 rounded text-charcoal"
        />

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {/* Nút đóng */}
        <button
          className="absolute top-2 right-3 text-xl font-bold text-charcoal"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
