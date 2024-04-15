import config from "../config/config.js";
import mongoose from "mongoose";

export let Contacts;

switch (config.persistence) {
  case "MONGO":
    const connection = mongoose.connect("mongodb://localhost:27017/contacts");

    const { default: ContactsMongo } = await import(
      "./mongo/contacts.mongo.js"
    );

    Contacts = ContactsMongo;
    break;
  case "MEMORY":
    const { default: ContactsMemory } = await import(
      "./memory/contacts.memory.js"
    );
    Contacts = ContactsMemory;
    break;
  case "MYSQL":
    //logica dela conexion
    break;
}
