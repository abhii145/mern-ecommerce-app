import express, { Request, Response } from "express";
import connectToMongoDB from "./database/Db";
import userRouter from "./routes/user";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/v1/user", userRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToMongoDB();
});
