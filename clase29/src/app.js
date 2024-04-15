import express from "express";
import businessRoute from "./routes/business.route.js";
import usersRoute from "./routes/users.route.js";
import ordersRoute from "./routes/orders.route.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const connection = mongoose.connect("mongodb://localhost:27017/e-commerce"); //llevarlo a un archivo aparte
//mid
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//routes
app.use("/api/users", usersRoute);
app.use("/api/business", businessRoute);
app.use("/api/orders", ordersRoute);

app.listen(4500, () => {
  console.log("Server on port 4500");
});
