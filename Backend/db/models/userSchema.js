import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  type: {
    type: String,
    default: "user",
    enum: ["user", "superadmin"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
});

export const User = mongoose.model("users", userSchema);