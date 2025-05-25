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
productRouter.get("/user/:userId", getProductsByUserId);
productRouter.get("/:id", getProductById);
productRouter.post("/create", isAuth, upload.single("image") ,createProduct);
productRouter.patch("/update/:id", isAuth, ownsProduct(Product), updateProduct);
productRouter.delete("/delete/:id", isAuth, ownsProduct(Product), deleteProduct);
productRouter.post("/like/:id", isAuth, likeProduct);
productRouter.post("/unlike/:id", isAuth, unlikeProduct);

module.exports = productRouter;