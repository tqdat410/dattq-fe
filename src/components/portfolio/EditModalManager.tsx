import React, { useState } from "react";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import CertificationEdit from "./CertificationEdit";
import ContactEdit from "./ContactEdit";
import ProjectEdit from "./ProjectEdit";
import CvEdit from "./CvEdit"; // Assuming you have a CvEdit component

interface Props {
  onClose: () => void;
  defaultTab?: "certification" | "contact" | "project" | "CV";
}

type TabType = "certification" | "contact" | "project" | "CV";

const EditModalManager: React.FC<Props> = ({
  onClose,
  defaultTab = "certification",
}) => {
  const [activeTab, setActiveTab] = useState<
    "certification" | "contact" | "project" | "CV"
  >(defaultTab);

  const renderForm = () => {
    switch (activeTab) {
      case "certification":
        return <CertificationEdit />;
      case "contact":
        return <ContactEdit />;
      case "project":
        return <ProjectEdit />;
      case "CV":
        return <CvEdit />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-opacity-30 flex items-center justify-center">
      <div className="w-[700px] h-[90%] relative rounded-2xl flex flex-col overflow-hidden">
        {/* Header Tabs - ngắn hơn phần dưới */}
        <div className="flex items-center justify-between w-full z-10">
          <div className="flex-1 w-[40%] flex justify-center gap-2 bg-white border-3 border-charcoal rounded-full shadow-lg h-full py-2">
            {["certification", "contact", "project", "CV"].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 text-sm font-medium rounded-full ${
                  activeTab === tab
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-charcoal hover:text-green-600"
                }`}
                onClick={() => setActiveTab(tab as TabType)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="w-[10%] flex justify-center pr-2 h-full">
            <button
              onClick={onClose}
              className="text-blue-700 hover:text-blue-900 cursor-pointer"
              aria-label="Close"
            >
              <PowerSettingsNewRoundedIcon
                fontSize="large"
                className="text-red-600 bg-white rounded-full border-3 border-charcoal shadow-lg"
              />
            </button>
          </div>
        </div>

        {/* Nội dung động bên dưới */}
        <div className="mt-5 overflow-y-auto flex-1 w-full">{renderForm()}</div>
      </div>
    </div>
  );
};

export default EditModalManager;
