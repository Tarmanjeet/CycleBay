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


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODJjYjM2MzM0Mzc5MTIwYmMxZDk2NzYiLCJ0eXBlIjoidXNlciIsIm5hbWUiOiJBbWlzaGEiLCJlbWFpbCI6ImFtaXNoYUBnbWFpbC5jb20iLCJpYXQiOjE3NDc3NTk5OTEsImV4cCI6MTc0Nzc2MzU5MX0.3nn7UeYZRo8-ejfL2BivHW491nR7O5rq_Lni-kd7rm0