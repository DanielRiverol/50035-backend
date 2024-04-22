import express from "express";
import usersRouter from "./routes/user.router.js";
import compression  from 'express-compression'

import errorHandler from './middlewares/errors/index.js'
const app = express();

app.set("PORT", process.env.PORT || 3000);

app.use(express.json())

app.use("/api/users", usersRouter);
app.use(errorHandler)
//midd compression
app.use(compression({brotli:{enabled:true,zlib:{}}}))
//router para un string
app.get("/string", (req, res) => {
  let string = `Soy Homero el malo`;
  for (let i = 0; i < 111000; i++) {
    string += `Soy Homero el malo`;
  }

  res.send(string);
});

app.listen(app.get("PORT"), console.log(`Server on port ${app.get("PORT")}`));
