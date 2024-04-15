import { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  resolveOrder,
} from "../controllers/order.controller.js";
const router = Router();

router.get("/", getOrders);
router.get("/:oid", getOrderById);
router.put("/:oid", resolveOrder);
router.post("/", createOrder);

export default router;
