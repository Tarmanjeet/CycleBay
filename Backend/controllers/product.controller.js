const path = require("path");
const {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
  getProductsByUserIdService
} = require("../services/product.service");

const { Product } = require("../db/models/productSchema");

let getAllProducts = async (req, res) => {
  try {
    const filters = {
      search: req.query.search,
      category: req.query.category,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      tags: req.query.tags,
    };

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "-1" ? -1 : 1;
 

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;

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

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('createdBy', 'name email'); 

    if (!product){ 
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.json({ success: true, data: product });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const imageFileName = req.file ? req.file.filename : null;

    const productData = {
      ...req.body,
      image: imageFileName,
      description: JSON.parse(req.body.description), 
    };

    const product = await createProductService(productData, req.user.userId);
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

const likeProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

   
    if (product.likedBy.includes(req.user.userId)) {
      return res.status(400).json({ success: false, message: "You have already liked this product" });
    }


    product.likedBy.push(req.user.userId);
    await product.save();

    return res.status(200).json({ 
      success: true, 
      message: "Product liked successfully",
      data: product 
    });
  } catch (err) {
    console.error("like product error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const unlikeProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    
    if (!product.likedBy.includes(req.user.userId)) {
      return res.status(400).json({ success: false, message: "You have not liked this product yet" });
    }

    
    product.likedBy = product.likedBy.filter(id => id.toString() !== req.user.userId);
    await product.save();

    return res.status(200).json({ 
      success: true, 
      message: "Product unliked successfully",
      data: product 
    });
  } catch (err) {
    console.error("unlike product error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getProductsByUserId = async (req, res) => {
  try {
    console.log("Fetching products for user:", req.params.userId);
    console.log("User from token:", req.user); // Log the user object from token
    
    if (!req.params.userId) {
      console.log("No userId provided in params");
      return res.status(400).json({ 
        success: false, 
        message: "User ID is required" 
      });
    }

    if (!req.user || !req.user.userId) {
      console.log("No user found in request");
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    const products = await getProductsByUserIdService(req.params.userId);
    console.log("Found products:", products.length);
    
    return res.status(200).json({
      success: true,
      message: "User products fetched successfully",
      data: products
    });
  } catch (err) {
    console.error("get user products error:", err);
    console.error("Error details:", {
      name: err.name,
      message: err.message,
      stack: err.stack
    });
    
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid user ID format" 
      });
    }
    return res.status(500).json({ 
      success: false, 
      message: "Server Error",
      error: err.message 
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  likeProduct,
  unlikeProduct,
  getProductsByUserId
};
