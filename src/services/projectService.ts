import axios from "../utils/axiosInstance";
import { Project } from "../types/ProjectType";

const API_URL = import.meta.env.VITE_API_URL + "/portfolio/projects";

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<Project[]>(API_URL);
    return response.data;
  } catch (err) {
    console.error("Failed to load projects:", err);
    throw err;
  }
};

export const createProject = async (
  project: Partial<Project>
): Promise<Project> => {
  try {
    const response = await axios.post(API_URL, project);
    return response.data;
  } catch (err) {
    console.error("Failed to create project:", err);
    throw err;
  }
};

export const updateProject = async (
  id: number,
  project: Partial<Project>
): Promise<Project> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, project);
    return response.data;
  } catch (err) {
    console.error("Failed to update project:", err);
    throw err;
  }
};

export const deleteProject = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (err) {
    console.error("Failed to delete project:", err);
    throw err;
  }
};
