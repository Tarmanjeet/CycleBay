const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  likeProduct,
  unlikeProduct,
  getProductsByUserId
} = require("../controllers/product.controller");

const { isAuth, ownsProduct } = require("../middlewares/authenticate");
const {Product} = require("../db/models/productSchema");
const upload = require("../middlewares/upload");

let productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/create", isAuth, upload.single("image"), createProduct);
productRouter.get("/user/:userId", isAuth, getProductsByUserId);
productRouter.post("/like/:id", isAuth, likeProduct);
productRouter.post("/unlike/:id", isAuth, unlikeProduct);
productRouter.get("/:id", getProductById);
productRouter.patch("/update/:id", isAuth, ownsProduct(Product), updateProduct);
productRouter.delete("/delete/:id", isAuth, ownsProduct(Product), deleteProduct);

module.exports = productRouter;