import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} from "../controllers/order.controller.js";
import { isAuth, isSuperAdmin } from "../middlewares/authenticate.js";

const orderRouter = express.Router();

orderRouter.post("/create", isAuth, createOrder);
orderRouter.get("/my-orders", isAuth, getUserOrders);
orderRouter.get("/:id", isAuth, getOrderById);
orderRouter.get("/", isAuth, isSuperAdmin, getAllOrders);
orderRouter.patch("/update-status/:id", isAuth, isSuperAdmin, updateOrderStatus);

export default orderRouter;