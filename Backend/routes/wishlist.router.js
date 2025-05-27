import express from "express";
import { isAuth } from "../middlewares/authenticate.js";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} from "../controllers/wishlist.controller.js";

const wishlistRouter = express.Router();

wishlistRouter.get("/", isAuth, getWishlist); 
wishlistRouter.post("/add/:productId", isAuth, addToWishlist); 
wishlistRouter.delete("/remove/:productId", isAuth, removeFromWishlist); 

export default wishlistRouter;