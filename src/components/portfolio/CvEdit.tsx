import React, { useState, useEffect } from "react";
import { handleUploadPDF } from "../../utils/uploadFile";
import { updateUserCvUrl, getCvUrl } from "../../services/cvService";

const CvEdit: React.FC = () => {
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  // Lấy CV URL hiện tại khi component mount
  useEffect(() => {
    const fetchCvUrl = async () => {
      try {
        const url = await getCvUrl();
        setCvUrl(url);
      } catch (err) {
        console.error("Failed to fetch CV URL:", err);
      }
    };
    fetchCvUrl();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleUpdate = async () => {
    if (!selectedFile) {
      alert("Vui lòng chọn file trước khi cập nhật.");
      return;
    }

    setUploading(true);
    try {
      const uploadedUrl = await handleUploadPDF(selectedFile);
      await updateUserCvUrl(uploadedUrl);
      setCvUrl(uploadedUrl);
      setSelectedFile(null);
      console.log("CV URL updated to backend");
    } catch (err) {
      console.error("Upload or update failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-white rounded-2xl shadow-xl p-4 overflow-auto relative border-charcoal border-3">
      <h2 className="text-2xl font-bold mb-4 text-green-600">CV Management</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4 text-charcoal border"
      />

      <button
        onClick={handleUpdate}
        disabled={uploading || !selectedFile}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {uploading ? "Đang cập nhật..." : "Update"}
      </button>

      {cvUrl && (
        <a
          href={cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-blue-600 underline"
        >
          Xem CV hiện tại
        </a>
      )}
    </div>
  );
};

export default CvEdit;
