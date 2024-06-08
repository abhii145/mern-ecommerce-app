import { Product } from "../models/product";
import { InvalidatesCacheProps } from "./../types/types";

export const invalidatesCache = async ({
  product,
  order,
  admin,
}: InvalidatesCacheProps) => {
  try {
    if (product) {
      const productKeys: string[] = [
        "latestProducts",
        "categoriesProducts",
        "admin-Products",
      ];

      const productIds = await Product.find().select("_id");

      productIds.forEach((key) => {
        productKeys.push(`singleProduct-${key._id}`);
      });
    }

    if (order) {
    }

    if (admin) {
    }
  } catch (error) {}
};
