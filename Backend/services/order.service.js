import { Order } from "../db/models/orderSchema.js";
import { Product } from "../db/models/productSchema.js";

export const createOrder = async (userId, body) => {
  const { products, address, paymentMethod } = body;

  let totalPrice = 0;
  const detailedProducts = [];

  for (const item of products) {
    const product = await Product.findById(item.product);
    if (!product) {
      const error = new Error("Product not found");
      error.status = 400;
      throw error;
    }

    totalPrice += product.price * item.quantity;
    detailedProducts.push({
      product: item.product,
      price: product.price,
      quantity: item.quantity,
    });
  }

  const order = new Order({
    user: userId,
    products: detailedProducts,
    address,
    paymentMethod,
    totalAmount: totalPrice
  });

  await order.save();
  return order;
};

export const getUserOrders = async (userId) => {
  const orders = await Order.find({ user: userId }).populate("products.product");
  if (!orders.length) {
    const error = new Error("No orders found");
    error.status = 404;
    throw error;
  }
  return orders;
};

export const getOrderById = async (orderId, user) => {
  const order = await Order.findById(orderId).populate("products.product");
  if (!order) {
    const error = new Error("Order not found");
    error.status = 404;
    throw error;
  }

  if (order.user.toString() !== user.userId && user.type !== "superadmin") {
    const error = new Error("Not authorized to view this order");
    error.status = 403;
    throw error;
  }

  return order;
};

export const getAllOrders = async () => {
  return await Order.find().populate("user").populate("products.product");
};

export const updateOrderStatus = async (orderId, status) => {
  const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
  if (!validStatuses.includes(status)) {
    const error = new Error("Invalid status");
    error.status = 400;
    throw error;
  }

  const order = await Order.findById(orderId);
  if (!order) {
    const error = new Error("Order not found");
    error.status = 404;
    throw error;
  }

  order.status = status;
  await order.save();
  return order;
};
