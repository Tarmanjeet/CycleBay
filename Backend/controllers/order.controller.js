const orderService = require("../services/order.service");

const createOrder = async (req, res) => {
  try {
    const result = await orderService.createOrder(req.user.userId, req.body);
    res.status(201).json({ message: "Order placed successfully", order: result });
  } catch (error) {
    console.error("Order error:", error);
    res.status(error.status || 500).json({ error: error.message || "Server error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await orderService.getUserOrders(req.user.userId);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("GET USER ORDERS ERROR:", error);
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id, req.user);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error("GET ORDER BY ID ERROR:", error);
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.status(200).json({ success: true, message: "Order status updated", data: updatedOrder });
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
};