import express, { Request, Response } from "express";
import connectToMongoDB from "./database/Db";
import userRouter from "./routes/user";
import orderRouter from "./routes/order";
import paymentRouter from "./routes/payment";
import productRouter from "./routes/product";
import dashBoardRouter from "./routes/stats";

import dotenv from "dotenv";
import NodeCache from "node-cache";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(morgan("dev"));

export const myCache = new NodeCache();

app.use("/api/v1/user", userRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/payment", paymentRouter);

app.use("/api/v1/dashboard", dashBoardRouter);

app.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
