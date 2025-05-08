import PortfolioLayout from "../layouts/PortfolioLayout";
import HomePart from "../components/portfolio/HomePart";
import About from "../components/portfolio/AboutPart";
import SkillPart from "../components/portfolio/SkillPart";
import ProjectsPart from "../components/portfolio/ProjectsPart";
import ContactPart from "../components/portfolio/ContactPart";
import TopBar from "../components/portfolio/TopBar";

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

const PortfolioPage = () => {
  return (
    <PortfolioLayout>
      <div className="flex flex-col items-center text-gray-100">
        <div id="topbar" className="w-full mb-30">
          <TopBar />
        </div>
        <SectionWrapper id="home">
          <HomePart />
        </SectionWrapper>
        <SectionWrapper id="about">
          <About />
        </SectionWrapper>
        <SectionWrapper id="skills">
          <SkillPart />
        </SectionWrapper>
        <SectionWrapper id="projects">
          <ProjectsPart />
        </SectionWrapper>
        <SectionWrapper id="contact">
          <ContactPart />
        </SectionWrapper>
      </div>
    </PortfolioLayout>
  );
};

export default PortfolioPage;
