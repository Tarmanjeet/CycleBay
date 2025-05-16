const { Product, getDescriptionSchema } = require("../db/models/productSchema");
const mongoose = require("mongoose");
const path = require("path");

let getAllProducts = async (req, res) => {
  try {
    let allProducts = await Product.find();
    if (allProducts.length === 0) {
      return res.status(404).sendFile("404.html", { root: process.cwd() });
    }
    return res.status(200).json({ success: true, message: "All products fetched successfully", data: allProducts });
  } catch (err) {
    console.error("GET ALL PRODUCTS ERROR:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

let getProductById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).sendFile("404.html", { root: process.cwd() });
    }
    return res.status(200).json({ success: true, message: "Product fetched successfully", data: product });
  } catch (err) {
    console.error("GET PRODUCT BY ID ERROR:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, desc, price, category, imgUrl, description } = req.body;

    if (!name || !desc || !price || !category || !description) {
      return res.status(400).json({ success: false, message: "Missing required product fields" });
    }

    const schema = getDescriptionSchema(category);
    const modelName = `TempDescription_${category.replace(/\s+/g, '_')}`;
    const TempModel = mongoose.models[modelName] || mongoose.model(modelName, schema);
    const descDoc = new TempModel(description);
    const validationError = descDoc.validateSync();

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: "Invalid description fields",
        errors: validationError.errors
      });
    }

    const newProduct = new Product({
      name,
      desc,
      price,
      category,
      imgUrl,
      description,
      createdBy: req.user.userId
    });

    await newProduct.save();

    return res.status(201).json({ success: true, message: "Product created successfully", data: newProduct });

  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


let updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      console.log("Product not found");
      return res.status(404).sendFile("404.html", { root: process.cwd() });
    }

    if (product.createdBy.toString() !== req.user.userId) {
      console.log("User does not own product");
      return res.status(403).json({ success: false, message: "You do not own this product" });
    }

    if (req.body.description) {
      const schema = getDescriptionSchema(req.body.category);
      const modelName = `TempDescription_${req.body.category.replace(/\s+/g, '_')}`;
      const TempModel = mongoose.models[modelName] || mongoose.model(modelName, schema);
      const descDoc = new TempModel(req.body.description);
      const validationError = descDoc.validateSync();
      if (validationError) {
        return res.status(400).json({
          success: false,
          message: "Invalid description fields in update",
          errors: validationError.errors
        });
      }
    }
    Object.assign(product, req.body);

    await product.save();
    res.status(200).json({ success: true, message: "Product updated successfully", data: product });

  } catch (err) {
    console.error("UPDATE ERROR:", err.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

let deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).sendFile("404.html", { root: process.cwd() });
    }

    if (product.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "You do not own this product" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
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