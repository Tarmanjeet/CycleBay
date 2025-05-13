const express=require("express");
const {check}=require("express-validator");
const {registerUser,loginUser,updateUser,deleteUser}=require("../controllers/user.controller")
const { isAuth , isAdmin , isSuperAdmin } =require("../middlewares/authenticate");
let userRouter=express.Router();

userRouter.post("/login",[
    check("email").notEmpty().isEmail(),
    check("password").notEmpty()
],loginUser);

userRouter.post("/register",[
    check("name").notEmpty(),
    check("email").notEmpty().isEmail(),
    check("password").notEmpty()
],registerUser);

userRouter.patch("/update/:id", isAuth , updateUser);

userRouter.delete("/delete/:id",isAuth , isSuperAdmin , deleteUser);

module.exports=userRouter;