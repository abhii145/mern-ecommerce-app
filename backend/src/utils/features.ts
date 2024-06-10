import { myCache } from "..";
import { Order } from "../models/order";
import { Product } from "../models/product";
import { InvalidatesCacheProps, OrderItemType } from "./../types/types";

export const invalidatesCache = async ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId,
}: InvalidatesCacheProps) => {
  try {
    if (product) {
      const productKeys: string[] = [
        "latestProducts",
        "categoriesProducts",
        "admin-Products",
        `singleProduct-${productId}`,
      ];


      if (typeof productId === "string") {
        productKeys.push(`singleProduct-${productId}`);
      }

      if (typeof productId === "object") {
        productId.forEach((key) => {
          productKeys.push(`singleProduct-${key}`);
        })

      }
      myCache.del(productKeys);
    }

 if (order) {
   const orderKeys: string[] = [
     "allOrders",
     `my-orders-${userId}`,
     `order-${orderId}`,
   ];
   const orders = await Order.find().select("_id");

   orders.forEach((key) => {
     orderKeys.push(`order-${key._id}`);
   });
   myCache.del(orderKeys);
 }


  }
  catch (error) {
    console.error(error);
  }
};

export const reduceStock = async (orderItem: OrderItemType[]) => {
  try {
    for (let i = 0; i < orderItem.length; i++) {
      const order = orderItem[i];
      const product = await Product.findById(order.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      product.stock -= order.quantity;
      await product.save();
    }
  } catch (error) {}
};
