import Contact from "../models/Contact.js";

export const listContacts = (filter, settings) => {
  return Contact.find(filter, "-createdAt -updatedAt", settings).populate(
    "owner",
    "email subscription"
  );
};

export const getContact = (filter) => Contact.findOne(filter);

export const deleteOneContact = (filter) => Contact.findOneAndDelete(filter);

export const addContact = (data) => Contact.create(data);

export const updateOneContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);

export const updateStatusContact = (filter, data) =>
  Contact.findOneAndUpdate(filter, data);
