const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ["Electronics", "Mobile Phones", "Clothes", "Footwear", "Accessories", "Books", "Beauty Products", "Sports"],
    default: "Electronics",
    required: true
  },
  imgUrl: {
    type: String
  },
  description: {
    BrandName: { type: String, required: true },
    DaysUsed: { type: Number, required: true },
    Condition: { type: String, enum: ["New", "Used"], required: true },
    Warranty: { type: String, enum: ["Yes", "No"], default: "No" }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
});

module.exports = mongoose.model("Product", productSchema);