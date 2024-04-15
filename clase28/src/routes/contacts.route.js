import { Router } from "express";
//import Contacts from "../dao/mongo/contacts.mongo.js";
//import Contacts from "../dao/memory/contacts.memory.js";
import { Contacts } from "../dao/factory.js";
import ContactDTO from '../dao/DTOs/contact.dto.js'
import { contactsService } from "../repositories/index.js";
const router = Router();

//const contactsService = new Contacts()

router.get('/',async (req,res)=>{
    const results = await contactsService.getContacts()
    res.status(200).json({messge:"success", payload: results})
})
router.post('/' ,async (req, res)=>{
const {first_name, last_name, phone}= req.body
const contact = new ContactDTO({ first_name, last_name, phone });
    const result = await contactsService.createContact(contact);
    res.json({ message: "success", payload: result });
})
export default router;
