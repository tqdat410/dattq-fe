// components/ContactEdit.tsx
import React, { useEffect, useState } from "react";
import { Contact } from "../../types/ContactType";
import * as contactService from "../../services/contactService"; // Import contactService
import ConfirmDeleteModal from "./ConfirmDelete";

const ContactEdit: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [form, setForm] = useState<Partial<Contact>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  // Fetch all contacts when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await contactService.getContacts();
        setContacts(data);
      } catch (err) {
        console.error("Failed to load contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission for creating or updating a contact
  const handleSubmit = async () => {
    try {
      let response: Contact; // Explicitly type the response variable as Contact
      if (editingId !== null) {
        response = await contactService.updateContact(editingId, form);
        setContacts((prev) =>
          prev.map((c) => (c.id === editingId ? response : c))
        );
        setEditingId(null);
      } else {
        response = await contactService.createContact(form);
        setContacts((prev) => [...prev, response]);
      }
      setForm({});
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  // Handle edit contact
  const handleEdit = (contact: Contact) => {
    setForm(contact);
    setEditingId(contact.id);
  };

  // Handle delete contact
  const handleDeleteConfirmed = async () => {
    if (deleteId === null) return;

    try {
      await contactService.deleteContact(deleteId);
      setContacts((prev) => prev.filter((c) => c.id !== deleteId));
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
        Manage Contacts
      </h2>

      {/* Form */}
      <div className="grid grid-cols-2 gap-4 mb-4 h-auto text-charcoal">
        <input
          type="text"
          name="type"
          placeholder="Type (e.g. Email, Phone)"
          value={form.type || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="label"
          placeholder="Label"
          value={form.label || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="url"
          placeholder="URL"
          value={form.url || ""}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
        <input
          type="text"
          name="icon"
          placeholder="Icon (e.g. fa fa-envelope)"
          value={form.icon || ""}
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

      {/* List */}
      <div className="overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-blue-800">{contact.label}</h3>
              <p className="text-sm text-gray-600">{contact.type}</p>
              <a
                href={contact.url}
                className="text-blue-500 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.url}
              </a>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(contact)}
                className="px-2 py-1 text-sm bg-yellow-400 rounded cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => confirmDelete(contact.id)}
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

export default ContactEdit;
