import React, { useState, useEffect } from "react";
import { Project } from "../../types/ProjectType";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/projectService";
import { handleUpload } from "../../utils/uploadFile";
import ConfirmDeleteModal from "./ConfirmDelete";

const ProjectEdit: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Partial<Project>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  // Fetch danh sách projects khi component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("Selected file:", file);
    try {
      const imageUrl = await handleUpload(file);
      setForm((prevForm) => ({ ...prevForm, imageUrl }));
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId !== null) {
        const updatedProject = await updateProject(editingId, form);
        setProjects((prev) =>
          prev.map((p) => (p.id === editingId ? updatedProject : p))
        );
        setEditingId(null);
      } else {
        const newProject = await createProject(form);
        setProjects((prev) => [...prev, newProject]);
      }
      setForm({});
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (project: Project) => {
    setForm(project);
    setEditingId(project.id);
  };

  const handleDeleteConfirmed = async () => {
    if (deleteId === null) return;

    try {
      await deleteProject(deleteId);
      setProjects((prev) => prev.filter((p) => p.id !== deleteId));
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
        Manage Projects
      </h2>

      {/* Form */}
      <div className="grid grid-cols-2 gap-4 mb-4 h-auto text-charcoal">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="liveUrl"
          placeholder="Live URL"
          value={form.liveUrl || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="projectType"
          placeholder="Project Type"
          value={form.projectType || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="githubUrl"
          placeholder="GitHub URL"
          value={form.githubUrl || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack"
          value={form.techStack || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e)}
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
          {editingId ? "Update" : "Create"}
        </button>
      </div>

      {/* Project List */}
      <div className="overflow-y-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-blue-800">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.techStack}</p>
              <a
                href={project.githubUrl}
                className="text-blue-500 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              {" | "}
              <a
                href={project.liveUrl}
                className="text-blue-500 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Website
              </a>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(project)}
                className="px-2 py-1 text-sm bg-yellow-400 rounded cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(project.id)}
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

export default ProjectEdit;
