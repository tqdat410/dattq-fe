// services/contactService.ts
import { AxiosResponse } from "axios";
import { Contact } from "../types/ContactType";
import axios from "../utils/axiosInstance";

// Use the environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL + "/portfolio/contacts";

// Fetch all contacts
export const getContacts = async (): Promise<Contact[]> => {
  try {
    const response: AxiosResponse<Contact[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to load contacts:", error);
    throw error;
  }
};

// Create a new contact
export const createContact = async (
  contact: Partial<Contact>
): Promise<Contact> => {
  try {
    const response: AxiosResponse<Contact> = await axios.post(API_URL, contact);
    return response.data;
  } catch (error) {
    console.error("Failed to create contact:", error);
    throw error;
  }
};

// Update an existing contact
export const updateContact = async (
  id: number,
  contact: Partial<Contact>
): Promise<Contact> => {
  try {
    const response: AxiosResponse<Contact> = await axios.put(
      `${API_URL}/${id}`,
      contact
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update contact:", error);
    throw error;
  }
};

// Delete a contact
export const deleteContact = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Failed to delete contact:", error);
    throw error;
  }
};
