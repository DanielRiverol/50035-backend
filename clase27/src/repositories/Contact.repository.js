import ContactDTO from "../dao/DTOs/contact.dto.js";

export default class ContactRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getContacts = async () => {
    return await this.dao.get();
  };
  createContact = async (contact) => {
    const newContact = new ContactDTO(contact);
    return await this.dao.createContact(newContact);
  };
}
