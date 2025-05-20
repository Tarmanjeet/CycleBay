const path = require("path");
const {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService
} = require("../services/product.service");

let getAllProducts = async (req, res) => {
  try {
    const filters = {
      category: req.query.category,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      tags: req.query.tags,
    };

    const sortBy = req.query.sort || "createdAt"; // can be 'price', 'rating'
    const sortOrder = req.query.order === "desc" ? -1 : 1;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let allProducts = await getAllProductsService(filters, sortBy, sortOrder, page, limit);

    if (allProducts.length === 0) {
      return res.status(404).json({ success: false, message: "No products found" });
    }

    return res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      data: allProducts,
    });
  } catch (err) {
    console.error("get all products error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

let getProductById = async (req, res) => {
  try {
    let product = await getProductByIdService(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, message: "Product fetched successfully", data: product });
  } catch (err) {
    console.error("get product by id error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const createProduct = async (req, res) => {
  try {
    console.log("Request body:", req.body);  
    const product = await createProductService(req.body, req.user.userId);
    res.status(201).json(product);
  } catch (error) {
    console.error("create product error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


let updateProduct = async (req, res) => {
  try {
    const updatedProduct = await updateProductService(req.params.id, req.user.userId, req.body);
    if (!updatedProduct) return res.status(404).json({ success: false, message: "Product not found" });
    return res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
  } catch (err) {
    if (err.message === "Forbidden") {
      return res.status(403).json({ success: false, message: "You do not own this product" });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: "Invalid description fields in update", errors: err.errors });
    }
    console.error("update product error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

let deleteProduct = async (req, res) => {
  try {
    const result = await deleteProductService(req.params.id, req.user.userId);
    if (!result) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    if (err.message === "Forbidden") {
      return res.status(403).json({ success: false, message: "You do not own this product" });
    }
    console.error("delete error:", err);
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
