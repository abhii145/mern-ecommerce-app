import {
  allCoupons,
  applyDiscount,
  deleteCoupon,
  newCoupon,
} from "../controllers/payment";
import { adminOnly } from "./../middlewares/auth";
import express from "express";

const app = express.Router();

app.post("/coupon/new", adminOnly, newCoupon);
app.get("/discount", applyDiscount);
app.get("/coupon/all", adminOnly, allCoupons);
app.delete("/coupon/:id", deleteCoupon);

export default app;
