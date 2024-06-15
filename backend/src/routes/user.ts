import { adminOnly } from "./../middlewares/auth";
import {
  deleteUser,
  getUser,
  getallUsers,
  newUser,
} from "./../controllers/user";
import express from "express";

const app = express.Router();

//route - /api/v1/user/new
app.post("/new", newUser);

//route - /api/v1/user/all
app.get("/all", adminOnly, getallUsers);

//route - /api/v1/user/id
app.get("/:id", getUser);

//route - /api/v1/user/id
app.delete("/:id", adminOnly, deleteUser);

export default app;
