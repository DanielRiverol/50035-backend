import { Contacts } from "../dao/factory.js";
import ContactRepository from "./Contact.repository.js";


export const contactsService = new ContactRepository(new Contacts()) 