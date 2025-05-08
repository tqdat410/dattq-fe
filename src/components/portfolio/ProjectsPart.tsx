import React, { useRef, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { getProjects } from "../../services/projectService";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  createdAt: string;
  projectType: string;
}

const ProjectsPart: React.FC = () => {
  const scrollRef = useRef(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const total = projects.length;
  const personalCount = projects.filter(
    (p) => p.projectType === "Personal"
  ).length;
  const collabCount = projects.filter(
    (p) => p.projectType === "Collaborate"
  ).length;

  // Fetch từ API
  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch((err) => console.error("Lỗi fetch dự án:", err));
  }, []);

  // Cuộn đến project theo index
  const scrollToIndex = (index: number) => {
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
      setCurrentIndex(index);
    }
  };

  // Scroll trái
  const scrollLeft = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    scrollToIndex(newIndex);
  };

  // Scroll phải
  const scrollRight = () => {
    const newIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  return (
    <section id="projects" className="w-full mx-auto">
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-2 pl-6">
          <h1 className="text-6xl font-extrabold mb-4 text-charcoal">
            Projects
          </h1>
          <h2 className="text-2xl font-semibold mb-2 text-green-600">
            What I've Built
          </h2>
          <p className="text-lg text-charcoal max-w-md mt-4">
            Here are some of the projects I've worked on, including personal
            projects and collaborations.
          </p>
        </div>

        <div className="lg:col-span-3 flex items-center">
          <div className="grid grid-cols-3 w-full">
            <div className="bg-white text-charcoal border-2 border-charcoal p-1 rounded-2xl shadow-lg shadow-gray-600 flex flex-col items-center justify-center w-20 h-20 ml-auto hover-lift">
              <h3 className="text-sm font-semibold">Total:</h3>
              <p className="text-xl font-bold mt-2">{total}</p>
            </div>

            <div className="bg-white text-charcoal border-2 border-charcoal p-1 rounded-2xl shadow-lg shadow-gray-600 flex flex-col items-center justify-center w-20 h-20 mx-auto hover-lift">
              <h3 className="text-sm font-semibold">Personal:</h3>
              <p className="text-xl font-bold mt-2">{personalCount}</p>
            </div>

            <div className="bg-white text-charcoal border-2 border-charcoal p-1 rounded-2xl shadow-lg shadow-gray-600 flex flex-col items-center justify-center w-20 h-20 mr-auto hover-lift">
              <h3 className="text-sm font-semibold">Collab:</h3>
              <p className="text-xl font-bold mt-2">{collabCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center gap-4 justify-center">
        <IconButton onClick={scrollLeft}>
          <ArrowBackIosNewIcon fontSize="large" />
        </IconButton>

        <div
          ref={scrollRef}
          className="w-[80%] overflow-x-auto flex space-x-6 hide-scrollbar scroll-smooth"
          style={{ overflowY: "hidden" }}
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="relative w-full h-[470px] bg-charcoal rounded-4xl p-6 flex-shrink-0 flex flex-col"
            >
              {/* Type tag: P or C */}
              <div className="absolute top-5 right-5 bg-white text-charcoal text-lg font-bold px-3 py-1 rounded-full">
                {project.projectType === "Personal" ? "P" : "C"}
              </div>

              {/* Icon giả định — bạn có thể chọn theo techStack hoặc loại project nếu backend trả thêm */}
              <div className="flex items-center justify-center mb-3 gap-2">
                <WebAssetIcon className="text-blue-400" fontSize="large" />
                <h3 className="text-lg font-semibold text-white text-center">
                  {project.title}
                </h3>
              </div>

              {/* Image từ backend */}
              <div className="mb-4 flex justify-center">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full max-w-[600px] h-[270px] object-cover rounded-xl border border-white"
                />
              </div>

              {/* Mô tả */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tech + GitHub */}
              <div className="flex justify-between items-center flex-wrap mt-auto gap-y-2">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.split(",").map((tech) => (
                    <span
                      key={tech.trim()}
                      className="bg-green-200 text-green-900 px-2 py-1 rounded text-xs font-semibold"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 ml-auto">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm"
                  >
                    Live
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <IconButton onClick={scrollRight}>
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      </div>
    </section>
  );
};

export default ProjectsPart;
