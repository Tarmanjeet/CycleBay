import {
  getWishlistService,
  addToWishlistService,
  removeFromWishlistService
} from "../services/wishlist.service.js";

const getWishlist = async (req, res) => {
  try {
    const wishlist = await getWishlistService(req.user.userId);
    return res.status(200).json({ success: true, data: wishlist });
  } catch (err) {
    console.error("getWishlist error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const addToWishlist = async (req, res) => {
  try {
    await addToWishlistService(req.user.userId, req.params.productId);
    return res.status(200).json({ success: true, message: "Product added to wishlist" });
  } catch (err) {
    console.error("addToWishlist error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    await removeFromWishlistService(req.user.userId, req.params.productId);
    return res.status(200).json({ success: true, message: "Product removed from wishlist" });
  } catch (err) {
    console.error("removeFromWishlist error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  getWishlist,
  addToWishlist,
  removeFromWishlist
};
