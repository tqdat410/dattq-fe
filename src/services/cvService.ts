import axios from "../utils/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL + "/portfolio/cvurl";

export const updateUserCvUrl = async (cvurl: string) => {
  try {
    console.log(API_URL); // Log the full URL being used
    const response = await axios.put(API_URL, { cvurl });
    return response.data;
  } catch (error) {
    console.error("Error updating CV URL:", error);
    throw error; // You can throw the error or handle it as needed
  }
};

export const getCvUrl = async () => {
  try {
    console.log(API_URL);
    const response = await axios.get(API_URL);
    return response.data.cvurl;
  } catch (error) {
    console.error("Error fetching CV URL:", error);
    throw error;
  }
};
