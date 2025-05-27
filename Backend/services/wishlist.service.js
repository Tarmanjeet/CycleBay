import { User } from "../db/models/userSchema.js";
import { Product } from "../db/models/productSchema.js";

const getWishlistService = async (userId) => {
  const user = await User.findById(userId).populate("wishlist");
  return user?.wishlist || [];
};

const addToWishlistService = async (userId, productId) => {
  const user = await User.findById(userId);
  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
  }
  await Product.findByIdAndUpdate(productId, { liked: true });
  return true;
};

const removeFromWishlistService = async (userId, productId) => {
  const user = await User.findById(userId);
  user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
  await user.save();
  await Product.findByIdAndUpdate(productId, { liked: false });
  return true;
};

export {
  getWishlistService,
  addToWishlistService,
  removeFromWishlistService
};
