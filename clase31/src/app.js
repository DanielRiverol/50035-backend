import express from "express";
import usersRouter from "./routes/user.router.js";
const app = express();

app.set("PORT", process.env.PORT || 3000);

app.use("/api/users", usersRouter);

app.listen(app.get("PORT"), console.log(`Server on port ${app.get("PORT")}`));
