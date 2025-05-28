import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../db/models/userSchema.js";

// Use a consistent fallback secret if environment variable is not set
const tokenSecret = process.env.TOKEN_SECRET || 'cyclebay_secure_jwt_secret_key_2024';

const registerUserService = async (body) => {
    let existingUser = await User.findOne({ email: body.email });
    if (existingUser && Object.keys(existingUser).length) {
        return { success: false, status: 400, message: "User already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    let newUser = new User({
        name: body.name,
        email: body.email,
        password: hashedPassword,
        phone: body.phone,
        type: body.type || "user"
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
        return { success: false, status: 500, message: "Internal server error" };
    }

    return { success: true, status: 200, message: "User registered successfully" };
};

const loginUserService = async (body) => {
    const { email, password } = body;
    const user = await User.findOne({ email });

    if (!user) {
        return { success: false, status: 400, message: "User not found" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return { success: false, status: 400, message: "Invalid credentials" };
    }

    const payLoad = {
        userId: user._id,
        type: user.type || "user",
        name: user.name,
        email: user.email
    };

    return new Promise((resolve, reject) => {
        jwt.sign(payLoad, tokenSecret, { expiresIn: '240h' }, (err, token) => {
            if (err) {
                console.error("Token generation error:", err);
                reject({ success: false, status: 500, message: "Internal server error" });
            }
            resolve({
                success: true,
                status: 200,
                message: "User Logged in successfully",
                token,
            });
        });
    });
};

const updateUserService = async (id, body) => {
    let user = await User.findById(id);
    if (!user) {
        return { success: false, status: 400, message: "User not found" };
    }

    if (body.name) user.name = body.name;
    if (body.email) user.email = body.email;
    if (body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(body.password, salt);
    }
    if (body.phone) user.phone = body.phone;
    if (body.type) user.type = body.type;

    await user.save();

    return { success: true, status: 200, message: "User updated successfully" };
};

const deleteUserService = async (id) => {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
        return { success: false, status: 400, message: "User not found" };
    }
    return { success: true, status: 200, message: "User deleted successfully" };
};

export {
    registerUserService,
    loginUserService,
    updateUserService,
    deleteUserService,
};