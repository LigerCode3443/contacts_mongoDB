import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find({}, "-createdAt -updatedAt");

export const getContactById = (contactId) => Contact.findById(contactId);

export const removeContact = (contactId) => Contact.findOneAndDelete(contactId);

export const addContact = (data) => Contact.create(data);

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data);

export const updateStatusContact = (id, data) =>
  Contact.findByIdAndUpdate(id, data);
