import { Router } from "express";
import { generateUser } from "../utils.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { generateErrorInfo } from "../services/errors/info.js";
const router = Router();

router.get("/", async (req, res) => {
  let users = [];
  for (let i = 0; i < 100; i++) {
    users.push(generateUser());
  }
  res.send({ status: "success", payload: users });
});

//data
let users = [];
router.post("/", (req, res) => {
  const { first_name, last_name, age, email } = req.body;
  //manejo de errores

  if (!first_name || !last_name || !email) {
    CustomError.createError({
      name: "Error creando el usuario",
      cause: generateErrorInfo({ first_name, last_name, age, email }),
      message: "Error al intentar crear el usuario",
      code: EErrors.INVALID_TYPES_ERROR,
    });
  }

  const user = { first_name, last_name, age, email };
  if (users.length === 0) {
    user.id = 1;
  } else {
    user.id = users[users.length - 1].id + 1;
  }

  users.push(user);
  res.send({ status: "succes", payload: user });
});

export default router;
