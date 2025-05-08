import React, { useState, useEffect } from "react";
import daImg from "../../assets/bamboo tree-bro.png";
import YouTubeIcon from "@mui/icons-material/YouTube";
import DownloadIcon from "@mui/icons-material/Download";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Link } from "@mui/material";
import LoginPopup from "./LoginPopup";
import EditModalManager from "./EditModalManager";
import { getCvUrl } from "../../services/cvService";

const HomeSection: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [cvLink, setCvLink] = useState<string>("");

  useEffect(() => {
    const fetchCvUrl = async () => {
      try {
        // Log kết quả trả về để kiểm tra
        const data = await getCvUrl();
        console.log("Data from getCvUrl:", data); // Kiểm tra data trả về
        if (data) {
          setCvLink(data); // Set cvLink nếu data tồn tại
        } else {
          console.error("No data returned from API");
        }
      } catch (error) {
        console.error("Failed to fetch CV link:", error);
      }
    };

    fetchCvUrl();
  }, []);

  useEffect(() => {
    // Log trạng thái của cvLink
    console.log("cvLink:", cvLink);
  }, [cvLink]); // Đảm bảo rằng cvLink đã được cập nhật

  return (
    <section
      id="home"
      className="grid grid-cols-1 md:grid-cols-3 grid-rows-[auto_auto] gap-4 max-w-6xl w-full mx-auto rounded-3xl"
    >
      {/* Row 1 - Left Content (2/3) */}
      <div className="md:col-span-2 row-start-1 row-end-2 pl-6">
        <h1 className="text-4xl font-extrabold mb-4 text-charcoal">
          Hi,
          <br /> I'm Trần Quốc Đạt
        </h1>
        <h2 className="text-2xl font-semibold mb-2 text-green-600">
          Fullstack Developer & SAP Consultant
        </h2>
        <p className="text-lg text-black mb-4 max-w-2xl">
          Welcome to my portfolio! I'm passionate about building robust web apps
          and SAP solutions. I work with Java Spring Boot, ReactJS, and n8n to
          create impactful digital experiences and solve complex problems.
        </p>
      </div>

      {/* Row 1 - Right Image (1/3) */}
      <div className="md:col-span-1 row-start-1 row-end-2 flex justify-end items-center">
        <img
          src={daImg}
          alt="Da Avatar"
          className="rounded-3xl object-cover"
          style={{
            width: 240,
            height: 240,
            minHeight: 180,
          }}
        />
      </div>

      {/* Row 2 - Full Width Section */}
      <div className="col-span-1 md:col-span-3 flex justify-center gap-6">
        {/* Box 1: Websites Section (3/5 width) */}
        <div className="w-3/5 rounded-4xl p-4 shadow-gray-400 shadow-lg border-charcoal border-2 bg-charcoal hover-lift flex flex-col justify-center items-center gap-4">
          <div className="flex justify-center gap-15 items-center">
            <div className="flex flex-col items-center">
              {/* Button mở popup */}
              <div className="flex flex-col items-center">
                <button onClick={() => setShowLogin(true)}>
                  <SettingsRoundedIcon sx={{ fontSize: 60, color: "Gray" }} />
                </button>
                <span className="text-white text-1xl">#@$#%&</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Link
                href=""
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                className="rounded-2xl"
              >
                <SettingsRoundedIcon sx={{ fontSize: 60, color: "Gray" }} />
              </Link>
              <span className="text-white text-1xl">#@$#%&</span>
            </div>

            <div className="flex flex-col items-center">
              <Link
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                className="bg-white rounded-2xl"
              >
                <YouTubeIcon sx={{ fontSize: 60, color: "#e53935" }} />
              </Link>
              <span className="text-white text-1xl">DaAgent</span>
            </div>
          </div>
        </div>

        {/* Popup component */}
        {showLogin && (
          <LoginPopup
            onClose={() => setShowLogin(false)}
            onLoginSuccess={() => setLoginSuccess(true)}
          />
        )}
        {/* Hiển thị Popup lớn khi đăng nhập thành công */}
        {loginSuccess && (
          <EditModalManager
            onClose={() => {
              setLoginSuccess(false);
              setShowLogin(false);
            }}
          />
        )}

        {/* Box 2: Buttons Section (2/5 width) */}
        <div className="w-2/5 rounded-4xl p-4 shadow-gray-400 shadow-lg border-charcoal border-2 bg-white flex flex-col justify-center items-center gap-4 hover-lift">
          <a
            href={cvLink}
            download
            className="bg-charcoal text-white font-semibold px-6 py-2 rounded-xl shadow hover:bg-gray-800 transition"
          >
            Download CV
            <DownloadIcon sx={{ fontSize: 20 }} />
          </a>
          <a
            href="#"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-green-500 text-white font-semibold px-6 py-2 rounded-xl shadow hover:bg-green-600 transition flex items-center"
          >
            Contact
            <PhoneCallbackIcon sx={{ fontSize: 20, ml: 1 }} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
