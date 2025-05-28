import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";
import wishlistRouter from "./routes/wishlist.router.js";
import offerRoutes from "./routes/offer.router.js";
import messageRouter from "./routes/message.route.js";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import "./db/connection.js";  

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/wishlist", wishlistRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/offer', offerRoutes);
app.use('/message', messageRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something broke!',
        error: err.message 
    });
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "/404.html"));
});

app.use("/", (req, res) => {
    res.status(200).send("Application is running");
});

app.listen(3000, (err) => {
    if(err) console.log("err", err);
    console.log("server listening on 3000");
});