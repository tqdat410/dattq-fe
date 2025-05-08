import React, { useEffect, useState } from "react";
import { Certification } from "../../types/CertificationType";
import * as certificationService from "../../services/certificationService"; // Import service
import { AxiosResponse } from "axios"; // Import for response typing
import ConfirmDeleteModal from "./ConfirmDelete";

const CertificationEdit: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [form, setForm] = useState<Partial<Certification>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  // Lấy danh sách certifications khi component load
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const data: Certification[] =
          await certificationService.getCertifications();
        setCertifications(data);
      } catch (err) {
        console.error("Failed to load certifications:", err);
      }
    };

    fetchCertifications();
  }, []);

  // Xử lý thay đổi của form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Xử lý submit form (tạo hoặc cập nhật certification)
  const handleSubmit = async () => {
    try {
      let response: Certification;
      if (editingId !== null) {
        const res: AxiosResponse<Certification> =
          await certificationService.updateCertification(editingId, form);
        response = res.data; // Extracting data from AxiosResponse
        setCertifications((prev) =>
          prev.map((cert) => (cert.id === editingId ? response : cert))
        );
        setEditingId(null);
      } else {
        const res: AxiosResponse<Certification> =
          await certificationService.createCertification(form);
        response = res.data; // Extracting data from AxiosResponse
        setCertifications((prev) => [...prev, response]);
      }
      setForm({});
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  // Xử lý chỉnh sửa certification
  const handleEdit = (cert: Certification) => {
    setForm(cert);
    setEditingId(cert.id);
  };

  // Xử lý xóa certification
  const handleDeleteConfirmed = async () => {
    if (deleteId === null) return;

    try {
      await certificationService.deleteCertification(deleteId);
      setCertifications((prev) => prev.filter((c) => c.id !== deleteId));
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setShowConfirmModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-white rounded-2xl shadow-xl p-4 overflow-auto relative border-charcoal border-3">
      <h2 className="text-2xl font-bold mb-4 text-green-600">
        Manage Certifications
      </h2>

      {/* Form */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-charcoal h-auto">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title || ""}
          onChange={handleChange}
          className="border-1 p-2 rounded"
        />
        <input
          type="text"
          name="credentialId"
          placeholder="Credential ID"
          value={form.credentialId || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="issueDate"
          value={form.issueDate || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="date"
          name="expirationDate"
          value={form.expirationDate || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="credentialUrl"
          placeholder="Credential URL"
          value={form.credentialUrl || ""}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description || ""}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white py-2 rounded col-span-2 cursor-pointer"
        >
          {editingId !== null ? "Update" : "Create"}
        </button>
      </div>

      {/* List */}
      <div className="overflow-y-auto">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-green-800">{cert.title}</h3>
              <p className="text-sm text-gray-600">{cert.description}</p>
              <a
                href={cert.credentialUrl}
                className="text-blue-500 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Certificate
              </a>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(cert)}
                className="px-2 py-1 text-sm bg-yellow-400 rounded cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(cert.id)}
                className="px-2 py-1 text-sm bg-red-500 text-white rounded cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <ConfirmDeleteModal
        show={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={handleDeleteConfirmed}
      />
    </div>
  );
};

export default CertificationEdit;
