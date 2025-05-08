import { AxiosResponse } from "axios";
import { Certification } from "../types/CertificationType";
import axios from "../utils/axiosInstance";

// Replace the URL with your actual API endpoint
const API_URL = import.meta.env.VITE_API_URL + "/portfolio/certifications";

export const getCertifications = async (): Promise<Certification[]> => {
  const response: AxiosResponse<Certification[]> = await axios.get(API_URL);
  return response.data;
};

export const createCertification = async (
  certification: Partial<Certification>
): Promise<AxiosResponse<Certification>> => {
  const response: AxiosResponse<Certification> = await axios.post(
    API_URL,
    certification
  );
  return response;
};

export const updateCertification = async (
  id: number,
  certification: Partial<Certification>
): Promise<AxiosResponse<Certification>> => {
  const response: AxiosResponse<Certification> = await axios.put(
    `${API_URL}/${id}`,
    certification
  );
  return response;
};

export const deleteCertification = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
