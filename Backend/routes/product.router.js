import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  likeProduct,
  unlikeProduct,
  getProductsByUserId
} from "../controllers/product.controller.js";

import { isAuth, ownsProduct } from "../middlewares/authenticate.js";
import { Product } from "../db/models/productSchema.js";
import upload from "../middlewares/upload.js";

let productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/create", isAuth, upload.single("image"), createProduct);
productRouter.get("/user/:userId", isAuth, getProductsByUserId);
productRouter.post("/like/:id", isAuth, likeProduct);
productRouter.post("/unlike/:id", isAuth, unlikeProduct);
productRouter.get("/:id", getProductById);
productRouter.patch("/update/:id", isAuth, ownsProduct(Product), updateProduct);
productRouter.delete("/delete/:id", isAuth, ownsProduct(Product), deleteProduct);

export default productRouter;