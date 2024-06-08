import express, { Request, Response } from "express";
import connectToMongoDB from "./database/Db";
import userRouter from "./routes/user";
import dotenv from "dotenv";
import productRouter from "./routes/product";
import NodeCache from "node-cache";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

export const myCache = new NodeCache();



app.use("/api/v1/user", userRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/product", productRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToMongoDB();
});
