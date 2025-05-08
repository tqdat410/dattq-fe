import { useEffect, useState } from "react";
import daImg from "../../assets/da.png";
import HomeIcon from "@mui/icons-material/HomeRounded";
import InfoIcon from "@mui/icons-material/Face6Rounded";
import WorkIcon from "@mui/icons-material/TerminalRounded";
import SkillIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import ContactMailIcon from "@mui/icons-material/PermContactCalendarRounded";

interface SidebarProps {
  className?: string;
}

const sections = [
  {
    id: "topbar",
    label: "Home",
    icon: <HomeIcon fontSize="medium" />,
    offset: 0,
  },
  {
    id: "about",
    label: "About",
    icon: <InfoIcon fontSize="medium" />,
    offset: -120,
  },
  {
    id: "skills",
    label: "Skills",
    icon: <SkillIcon fontSize="medium" />,
    offset: -100,
  },
  {
    id: "projects",
    label: "Projects",
    icon: <WorkIcon fontSize="medium" />,
    offset: -10,
  },
  {
    id: "contact",
    label: "Contact",
    icon: <ContactMailIcon fontSize="medium" />,
    offset: -80,
  },
];

const Sidebar = ({ className = "" }: SidebarProps) => {
  const [activeSection, setActiveSection] = useState<string>("");

  const handleScroll = (id: string, offset: number = 0) => {
    const element = document.getElementById(id);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop + offset;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const handleScrollSpy = () => {
    const scrollPos = window.scrollY;

    if (scrollPos < 200) {
      setActiveSection("topbar");
      return;
    }

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (!el) continue;

      const offsetTop = el.offsetTop;
      const offsetHeight = el.offsetHeight;

      if (
        scrollPos >= offsetTop - 150 &&
        scrollPos < offsetTop + offsetHeight - 150
      ) {
        setActiveSection(id);
        break;
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  return (
    <aside
      className={`shadow-lg flex flex-col items-center px-4 py-7 justify-center rounded-3xl w-3/4 bg-[#353535] font-['Roboto'] ${className}`}
    >
      <img
        src={daImg}
        alt="Da"
        className="w-44 h-44 rounded-full border-2 border-white mb-4 object-cover"
      />
      <h1 className="text-white text-2xl font-black mb-1">Trần Quốc Đạt</h1>
      <p className="text-white text-sm mb-1">Fullstack Developer /</p>
      <p className="text-white text-sm mb-1">SAP Consultant</p>

      <div className="flex flex-col gap-2 w-3/4 items-center mt-4 mb-6">
        {sections.map(({ id, label, icon, offset }) => (
          <button
            key={id}
            className={`flex items-center gap-2 py-3 px-6 rounded ${
              id === "contact" ? "border-2 rounded-4xl max-w-3/4 mt-3" : ""
            } justify-center w-full text-xl font-semibold transition-colors duration-200 cursor-pointer
              ${
                activeSection === id
                  ? `text-green-200 font-bold ${
                      id === "contact" ? "border-green-200" : ""
                    }`
                  : `text-white hover:text-green-200 ${
                      id === "contact"
                        ? "border-white hover:border-green-200"
                        : ""
                    }`
              }`}
            onClick={() => handleScroll(id, offset)}
          >
            {icon} {label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
