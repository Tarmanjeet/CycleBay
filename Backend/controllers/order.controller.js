import {
  createOrder as createOrderService,
  getUserOrders as getUserOrdersService,
  getOrderById as getOrderByIdService,
  getAllOrders as getAllOrdersService,
  updateOrderStatus as updateOrderStatusService
} from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const result = await createOrderService(req.user.userId, req.body);
    res.status(201).json({ message: "Order placed successfully", order: result });
  } catch (error) {
    console.error("Order error:", error);
    res.status(error.status || 500).json({ error: error.message || "Server error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await getUserOrdersService(req.user.userId);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("GET USER ORDERS ERROR:", error);
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await getOrderByIdService(req.params.id, req.user);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("GET ORDER BY ID ERROR:", error);
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersService();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await updateOrderStatusService(req.params.id, req.body.status);
    res.status(200).json({ success: true, message: "Order status updated", data: updatedOrder });
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};