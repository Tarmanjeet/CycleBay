import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} from "../controllers/order.controller.js";

import { isAuth, isSuperAdmin } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/create", isAuth, createOrder);
router.get("/my-orders", isAuth, getUserOrders);
router.get("/:id", isAuth, getOrderById);

router.get("/", isAuth, isSuperAdmin, getAllOrders);
router.patch("/update-status/:id", isAuth, isSuperAdmin, updateOrderStatus);

export default router;