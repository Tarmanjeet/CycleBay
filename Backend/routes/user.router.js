import express from "express";
import { check } from "express-validator";
import { registerUser, loginUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post(
    "/login",[
        check("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
        check("password").notEmpty().withMessage("Password is required"),
    ],loginUser
);

userRouter.post(
    "/register",[
        check("name").notEmpty().withMessage("Name is required"),
        check("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
        check("password").notEmpty().withMessage("Password is required"),
    ],registerUser
);

userRouter.patch("/update/:id", updateUser); 
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;