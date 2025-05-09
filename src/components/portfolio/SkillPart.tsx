import React from "react";
import LanguaguesIcon from "@mui/icons-material/PublicRounded";
import SSkilsIcon from "@mui/icons-material/PeopleRounded";
import WebIcon from "@mui/icons-material/CodeRounded";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import DataObjectIcon from "@mui/icons-material/DataObject";
import Coding from "../../assets/Hand coding-bro.svg";

const SkillPart: React.FC = () => {
  return (
    <section id="skills" className="max-w-6xl w-full mx-auto">
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Content */}
        <div className="col-span-1 flex flex-col justify-start items-start pl-6 w-full">
          <h1 className="text-7xl font-extrabold mb-4 text-charcoal">Skills</h1>
          <h2 className="text-2xl font-semibold mb-2 text-green-600">
            What Can I Do
          </h2>
          <p className="text-lg text-charcoal max-w-2xl">
            Here are some of the main technologies and skills I use in my daily
            work ...
          </p>
          <img
            src={Coding}
            alt="Skills Illustration"
            className="w-full max-w-sm rounded-xl"
          />
        </div>

        {/* Right Content */}
        <div className="col-span-2 relative">
          {/* Languages & Softskills */}
          <div className="relative flex flex-wrap gap-4">
            {/* Softskills */}
            <div className="bg-charcoal rounded-4xl rounded-bl-none p-6 w-full md:w-[60%] shadow-gray-600 shadow-lg hover-lift">
              <div className="flex items-center mb-2 gap-2">
                <SSkilsIcon className="text-pink-400" fontSize="large" />
                <h3 className="text-lg font-semibold text-white">Softskills</h3>
              </div>
              <ul className=" pl-6 text-white text-base space-y-1">
                <li>Teamwork</li>
                <li>Communication</li>
                <li>Leadership</li>
                <li>Problem-solving</li>
              </ul>
            </div>

            {/* Languages */}
            <div className="text-charcoal absolute top-20 left-[50%] md:w-[45%] rounded-4xl rounded-bl-none p-4 border-2 z-10 shadow-gray-600 shadow-lg border-charcoal bg-white hover-lift">
              <div className="flex items-center mb-2 gap-2">
                <LanguaguesIcon className="text-green-600" fontSize="large" />
                <h3 className="text-lg font-semibold">Languages</h3>
              </div>
              <ul className="pl-6 text-base space-y-1">
                <li>Vietnamese (Native)</li>
                <li>English (Intermediate)</li>
                <li>{/* Japanese (Basic)8*/}</li>
              </ul>
            </div>

            <div className="text-charcoal absolute top-48 left-[7%] md:w-[35%] rounded-4xl rounded-bl-none p-4 shadow-gray-600 shadow-lg border-charcoal bg-white z-10 border-2 hover-lift">
              <div className="flex items-center mb-2 gap-2">
                <WebIcon className="text-charcoal" fontSize="large" />
                <h3 className="text-lg font-semibold">Programming</h3>
              </div>
              <ul className=" pl-6 text-base space-y-1">
                <li>C/C++, Java</li>
                <li>HTML, CSS, JS, TS</li>
                <li>ABAP</li>
              </ul>
            </div>
          </div>

          {/* Technical & Other Skills */}
          <div className="relative flex flex-wrap gap-4 mt-20">
            {/* Technical Skills */}
            <div className="ml-auto bg-charcoal rounded-4xl rounded-tl-none p-6 w-full md:w-[75%] z-0 shadow-gray-600 shadow-lg hover-lift">
              {/* Centered Title */}
              <div className="flex items-center mb-4 gap-2 justify-center">
                <DataObjectIcon className="text-blue-400" fontSize="large" />
                <h3 className="text-xl font-bold text-white">
                  Technical Skills
                </h3>
              </div>

              {/* Content in 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white text-base">
                {/* Column 1 */}
                <div className="space-y-2 pl-10">
                  <div>
                    <p className="font-semibold text-green-200">Frameworks:</p>
                    <p>Java Spring Boot</p>
                    <p>ReactJS</p>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-2 pl-5">
                  <div>
                    <p className="font-semibold text-green-200">
                      Workflow tools:
                    </p>
                    <p>Git, GitHub</p>
                    <p>Agile, Jira</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-200">Database:</p>
                    <p>MySQL, PostgreSQL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Skills */}
            <div className="text-charcoal absolute top-[70%] right-83 md:w-[40%] rounded-4xl rounded-tl-none p-4 shadow-gray-600 shadow-lg border-charcoal bg-white z-20 border-2 hover-lift">
              <div className="flex items-center mb-2 gap-2">
                <IntegrationInstructionsIcon
                  className="text-red-500"
                  fontSize="large"
                />
                <h3 className="text-lg font-semibold">Other Skills</h3>
              </div>
              <ul className="pl-6 text-base space-y-1">
                <li>n8n Automation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillPart;
