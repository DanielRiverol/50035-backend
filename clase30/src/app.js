import express from "express";
import { config } from "dotenv";
import __dirname from "./utils.js";
import nodemailer from "nodemailer";
import twilio from "twilio";

//initialization
const app = express();
config();

//settings
app.set("PORT", process.env.PORT || 3000);

//twilio
const client = twilio(process.env.TWILIO_SSID, process.env.AUTH_TOKEN);

//nodemailer
const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
//routes
app.get("/", (req, res) => {
  res.send("Inicio");
});

//mail route
app.get("/mail", async (req, res) => {
  const result = await transport.sendMail({
    from: `Correo de prueba <${process.env.MAIL_USERNAME}>`,
    to: `${process.env.MAIL_USERNAME}`,
    subject: "Correo de prueba",
    html: `<div>
              <h1>CORREO TEST</h1>
              <p>Correo con adjunto</p>
          </div>`,
    attachments: [
      {
        filename: "img1.jpg",
        path: __dirname + "/public/img/img1.jpg",//adjunto
        cid: "img1",
      },
    ],
  });
  res.send("correo enviado");
});

//sms
app.get("/sms", async (req, res) => {
  const { message } = req.body;
  const result = await client.messages.create({
    body: message,
    to: process.env.PHONE_NUMBER_TO,//cliente
    from: process.env.PHONE_NUMBER,//numero twilio
  });

  res.send("Sms enviado");
});

//listeners
app.listen(app.get("PORT"), console.log(`Server on port ${app.get("PORT")}`));
