import React from "react";
import daImg from "../../assets/qrcode.svg";
import {
  GitHub,
  LinkedIn,
  Facebook,
  YouTube,
  Instagram,
  Email,
  X,
} from "@mui/icons-material";
import { Contact } from "../../types/ContactType";

interface ContactSectionProps {
  data: Contact[];
}

const getIconComponent = (type: string) => {
  switch (type.toLowerCase()) {
    case "email":
      return <Email className="text-red-600" fontSize="medium" />;
    case "github":
      return <GitHub className="text-black" fontSize="medium" />;
    case "linkedin":
      return <LinkedIn className="text-blue-600" fontSize="medium" />;
    case "facebook":
      return <Facebook className="text-blue-500" fontSize="medium" />;
    case "x":
      return <X className="text-black" fontSize="medium" />;
    case "youtube":
      return <YouTube className="text-red-600" fontSize="medium" />;
    case "instagram":
      return <Instagram className="text-pink-700" fontSize="medium" />;
    default:
      return null;
  }
};

const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  const emailContact = data.find((c) => c.type.toLowerCase() === "email");
  const githubContact = data.find((c) => c.type.toLowerCase() === "github");

  return (
    <section className="w-full mx-auto px-4">
      <div className="mb-6 text-center">
        <h1 className="text-6xl font-extrabold text-charcoal">Contact</h1>
      </div>

      <div className="rounded-4xl flex flex-row justify-center items-center overflow-hidden gap-4">
        {/* Ảnh QR */}
        <div className="pt-5 pb-5">
          <img
            src={daImg}
            alt="Banner"
            className="h-90 object-contain border-charcoal rounded-4xl shadow-lg border-2 shadow-gray-600 mb-5 rounded-bl-none hover-lift"
          />
          <div className="bg-charcoal w-full rounded-4xl shadow-lg shadow-gray-600 mb-5 p-2 text-white text-large rounded-tl-none pl-20 hover-lift">
            <p>Gmail: {emailContact?.url.replace("mailto:", "")}</p>
            <p>GitHub: {githubContact?.url.replace("https://", "")}</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col gap-1 bg-charcoal p-2 py-6 rounded-4xl w-1/10 shadow-gray-600 shadow-lg  mb-5 hover-lift pt-5 pb-5">
          {data.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="justify-center items-center flex"
            >
              <div className="border-2 rounded-full p-3 hover:bg-gray-100 transition bg-white w-9/12">
                {getIconComponent(item.type)}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
