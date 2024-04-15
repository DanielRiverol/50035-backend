import express from "express";
import contactRoutes from "./routes/contacts.route.js";
//import mongoose from "mongoose";
//const connection = mongoose.connect("mongodb://localhost:27017/contacts");

const app = express();

//middlewaes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/contacts", contactRoutes);

//listener
app.listen(4000, () => {
  console.log(`Server on port 4000`);
});
