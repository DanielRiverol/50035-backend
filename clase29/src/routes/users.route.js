import { Router } from "express";
import {
  saveUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/:uid", getUserById);
router.put("/", updateUser);
router.post("/", saveUser);

export default router;
