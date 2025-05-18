const Order = require("../db/models/orderSchema");
const { Product } = require("../db/models/productSchema");

const createOrder = async (req, res) => {
  try {
    const { products, address, paymentMethod } = req.body;
    const userId = req.user.userId;

    let totalPrice = 0;
    const detailedProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ error: "Product not found" });
      }

      totalPrice += product.price * item.quantity;
      detailedProducts.push({
        product: item.product,
        price: product.price,
        quantity: item.quantity,
      });
    }

    const order = new Order({
      user : userId,
      products: detailedProducts,
      address,
      paymentMethod,
      totalAmount : totalPrice
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate("products.product");
    if (!orders.length) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }
    return res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error("GET USER ORDERS ERROR:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("products.product");
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.user.toString() !== req.user.userId && req.user.type !== "superadmin") {
      return res.status(403).json({ success: false, message: "Not authorized to view this order" });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.error("GET ORDER BY ID ERROR:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("products.product");
    return res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error("GET ALL ORDERS ERROR:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({ success: true, message: "Order status updated", data: order });
  } catch (err) {
    console.error("UPDATE ORDER STATUS ERROR:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
};