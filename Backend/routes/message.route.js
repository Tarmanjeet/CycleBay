import express from "express";
import { isAuth } from "./../middlewares/authenticate.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/user", isAuth, getUsersForSidebar);
router.get("/:id", isAuth, getMessages);
router.post("/send/:id", isAuth, sendMessage);

export default router;