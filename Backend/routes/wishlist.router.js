const express = require("express");
const { isAuth } = require("../middlewares/authenticate");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} = require("../controllers/wishlist.controller");

const wishlistRouter = express.Router();

wishlistRouter.get("/", isAuth, getWishlist); 
wishlistRouter.post("/add/:productId", isAuth, addToWishlist); 
wishlistRouter.delete("/remove/:productId", isAuth, removeFromWishlist); 

module.exports = wishlistRouter;