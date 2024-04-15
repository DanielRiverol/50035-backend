import contactsModel from "./models/Contact.js";

class Contacts {
  constructor() {}
  get = async () => {
    const result = await contactsModel.find();
    return result;
  };

  create = async (contact) => {
    const { first_name, last_name, phone } = contact;
    const newContact = await contactsModel.create({
      first_name,
      last_name,
      phone,
    });
    await newContact.save();
    return newContact;
  };
}

export default Contacts;
