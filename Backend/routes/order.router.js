const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/order.controller");

const { isAuth, isSuperAdmin } = require("../middlewares/authenticate");

const orderRouter = express.Router();

orderRouter.post("/create", isAuth, createOrder);
orderRouter.get("/my-orders", isAuth, getUserOrders);
orderRouter.get("/:id", isAuth, getOrderById);

orderRouter.get("/", isAuth, isSuperAdmin, getAllOrders);
orderRouter.patch("/update-status/:id", isAuth, isSuperAdmin, updateOrderStatus);

module.exports = orderRouter;