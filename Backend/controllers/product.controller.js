const products = require("../db/models/productSchema");
const mongoose = require("mongoose");
const path = require("path");

let getAllProducts = async (req, res) => {
  try {
    let allProducts = await products.find();
    if (allProducts.length === 0) {
      return res.status(404).sendFile("404.html", { root: process.cwd() });
    }
    return res.status(200).json({ success: true, message: "All products fetched successfully", data: allProducts });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

let getProductById = async (req, res) => {
  try {
    let product = await products.findById(req.params.id);
    if (!product) {
      return res.status(404).sendFile("404.html", { root: process.cwd() });
    }
    return res.status(200).json({ success: true, message: "Product fetched successfully", data: product });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

let createProduct = async (req, res) => {
  try {
    const body = req.body;
    const newProduct = new products({
      name: body.name,
      desc: body.desc,
      price: body.price,
      category: body.category,
      imgUrl: body.imgUrl,
      description: body.description,
      createdBy: req.user.userId
    });

    await newProduct.save();
    return res.status(200).json({ success: true, message: "Product created successfully", data: newProduct });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

let updateProduct = async (req, res) => {
  try {
    let product = await products.findById(req.params.id);
    if (!product) {
      return res.status(404).sendFile("404.html", { root: process.cwd() });
    }

    if (product.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "You do not own this product" });
    }

    const updates = req.body;
    Object.assign(product, updates);
    await product.save();
    res.status(200).json({ success: true, message: "Product updated successfully", data: product });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

let deleteProduct = async (req, res) => {
  try {
    let product = await products.findById(req.params.id);
    if (!product) {
      return res.status(404).sendFile("404.html", { root: process.cwd() });
    }

    if (product.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "You do not own this product" });
    }

    await products.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};