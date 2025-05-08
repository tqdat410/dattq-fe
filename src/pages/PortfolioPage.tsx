import { useEffect, useState } from "react";
import PortfolioLayout from "../layouts/PortfolioLayout";
import Sidebar from "../components/portfolio/Sidebar";
import HomePart from "../components/portfolio/HomePart";
import About from "../components/portfolio/AboutPart";
import SkillPart from "../components/portfolio/SkillPart";
import ProjectsPart from "../components/portfolio/ProjectsPart";
import ContactPart from "../components/portfolio/ContactPart";
import TopBar from "../components/portfolio/TopBar";
import { LoadingProvider, useLoading } from "../contexts/LoadingContext";
import LoadingScreen from "../components/LoadingScreen";
import { getCvUrl } from "../services/cvService";
import { getCertifications } from "../services/certificationService";
import { Certification } from "../types/CertificationType";
import { getProjects } from "../services/projectService";
import { Project } from "../types/ProjectType";
import { getContacts } from "../services/contactService";
import { Contact } from "../types/ContactType";

// Hàm gọi lại API khi gặp lỗi 500
const fetchWithRetry = async (
  fetchFunction: () => Promise<any>,
  retries: number = 5,
  delay: number = 1000
) => {
  let lastError = null;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fetchFunction();
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        console.log(`Attempt ${attempt} failed. Retrying...`);
        await new Promise((resolve) => setTimeout(resolve, delay)); // Delay giữa các lần thử
      }
    }
  }
  throw lastError; // Sau khi hết retries, ném lỗi cuối cùng
};

const SectionWrapper = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => (
  <div id={id} className="max-w-4xl w-full mx-auto mb-50 px-4">
    {children}
  </div>
);

const PortfolioPageContent = () => {
  const { isAllLoaded, setIsAllLoaded } = useLoading();
  const [homeData, setHomeData] = useState(String);
  const [aboutData, setAboutData] = useState<Certification[]>([]);
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [contactData, setContactData] = useState<Contact[]>([]);

  const fetchHomeData = async () => {
    try {
      const data = await fetchWithRetry(getCvUrl);
      setHomeData(data);
    } catch (err) {
      console.error("Error fetching home data after retries", err);
    }
  };

  const fetchAboutData = async () => {
    try {
      const data = await fetchWithRetry(getCertifications);
      setAboutData(data);
    } catch (err) {
      console.error("Error fetching about data after retries", err);
    }
  };

  const fetchProjectsData = async () => {
    try {
      const data = await fetchWithRetry(getProjects);
      setProjectsData(data);
    } catch (err) {
      console.error("Error fetching projects data after retries", err);
    }
  };

  const fetchContactData = async () => {
    try {
      const data = await fetchWithRetry(getContacts);
      setContactData(data);
    } catch (err) {
      console.error("Error fetching contact data after retries", err);
    }
  };

  // useEffect để gọi các API khi component được render
  useEffect(() => {
    const fetchData = async () => {
      await fetchHomeData();
      await fetchAboutData();
      await fetchProjectsData();
      await fetchContactData();

      // Khi tất cả các dữ liệu đã được tải, cập nhật trạng thái isAllLoaded
      setIsAllLoaded(true);
    };

    fetchData();
  }, [setIsAllLoaded]);

  useEffect(() => {
    if (!isAllLoaded) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup nếu component bị unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isAllLoaded]);

  return (
    <div className="relative">
      {!isAllLoaded && (
        <div className="fixed inset-0 z-50 w-full h-full">
          <LoadingScreen />
        </div>
      )}

      <div
        className={`flex flex-col items-center text-gray-100 transition-opacity duration-500 ${
          isAllLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div id="topbar" className="w-full mb-30">
          <TopBar />
        </div>
        <SectionWrapper id="home">
          <HomePart data={homeData} />
        </SectionWrapper>
        <SectionWrapper id="about">
          <About data={aboutData} />
        </SectionWrapper>
        <SectionWrapper id="skills">
          <SkillPart />
        </SectionWrapper>
        <SectionWrapper id="projects">
          <ProjectsPart data={projectsData} />
        </SectionWrapper>
        <SectionWrapper id="contact">
          <ContactPart data={contactData} />
        </SectionWrapper>
      </div>
    </div>
  );
};

export const PortfolioPage = () => {
  return (
    <LoadingProvider>
      <PortfolioLayout
        sidebar={<Sidebar className="shadow-lg shadow-gray-600 hover-lift" />}
      >
        <PortfolioPageContent />
      </PortfolioLayout>
    </LoadingProvider>
  );
};

export default PortfolioPage;
