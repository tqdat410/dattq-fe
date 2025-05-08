import React, { useEffect, useState } from "react";
import daImg from "../../assets/da.png";
import { getCertifications } from "../../services/certificationService";

type Certification = {
  title: string;
  credentialUrl: string;
};

const About: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    getCertifications()
      .then((data) => setCertifications(data))
      .catch((err) => console.error("Failed to fetch certifications", err));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 rounded-4xl text-white items-center">
      {/* Row 1: Avatar + Title */}
      <div className="col-span-1 flex justify-center items-center">
        <img
          src={daImg}
          alt="Avatar"
          className="w-[180px] h-[180px] object-cover rounded-4xl border-2 border-charcoal shadow-md hover-lift"
        />
      </div>

      <div className="col-span-2 flex items-center">
        <h5 className="text-6xl font-bold text-center tracking-wide text-charcoal">
          Who Am I
        </h5>
      </div>

      {/* About Me */}
      <div className="col-span-3">
        <div className="w-full pl-6">
          <p className="text-lg text-charcoal leading-relaxed">
            My name is Trần Quốc Đạt, a Vietnamese born in 2004, currently
            living and working in Ho Chi Minh City. I am studying to become a
            software engineer, specializing in Java and SAP ABAP development.
          </p>
        </div>
      </div>

      {/* Certifications */}
      <div className="col-start-4 row-start-1 row-span-3 h-90 rounded-4xl p-4 shadow-gray-400 shadow-lg border-charcoal border-2 bg-charcoal hover-lift">
        <h3 className="text-lg font-bold text-center underline mb-4 tracking-wide text-white">
          Certifications
        </h3>
        <ul className="space-y-2 text-gray-200 text-lg w-full overflow-y-auto h-[90%] hide-scrollbar">
          {certifications.map((cert, index) => (
            <li key={index}>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-200 hover:underline text-sm"
              >
                {cert.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Education */}
      <div className="col-span-3 ">
        <div className="grid grid-cols-3 gap-4 w-full">
          {/* Khối 1 - chiếm 1/3 */}
          <div className="text-charcoal rounded-4xl p-4 shadow-gray-400 shadow-lg border-charcoal border-2 bg-white flex flex-col justify-center items-center hover-lift">
            <h3 className="text-lg font-bold mb-2">Other Info</h3>
            <p className="text-base">
              Basic knowledge of AI automation and business process.
            </p>
          </div>

          {/* Khối 2 - Education, chiếm 2/3 */}
          <div className="col-span-2 bg-charcoal rounded-4xl p-4 shadow-gray-400 shadow-lg border-charcoal border-2 bg-charcoal hover-lift">
            <h3 className="text-lg font-bold text-center underline mb-4 tracking-wide text-white">
              Education
            </h3>
            <ul className="space-y-2 text-gray-200 text-lg pl-4">
              <li>
                <div className="font-semibold">
                  B.S. in Software Engineering - FPT University (2022 - 2026)
                </div>
                <div className="pl-4">
                  <div>
                    <span className="font-semibold text-green-200">GPA:</span>{" "}
                    3.6 / 4.0
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
