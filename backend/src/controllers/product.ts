import { BaseQuery } from "./../types/types";
import { rm } from "fs";
import { Product } from "./../models/product";
import { Request, Response } from "express";

export const newProduct = async (req: Request, res: Response) => {
  try {
    const { title, price, category, stock } = req.body;

    const photo = req.file;

    if (!photo) {
      return res
        .status(400)
        .json({ success: false, message: "Photo is required" });
    }

    if (!title || !price || !category || !stock) {
      rm(photo.path, () => {});

      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    await Product.create({
      title,
      price,
      category: category.toLowerCase(),
      stock,
      photo: photo?.path,
    });

    return res.status(201).json({ success: true, message: "Product created" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getLatestProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(5);

    return res
      .status(201)
      .json({ success: true, products, message: "Product created" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllProductByCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Product.distinct("category");
    return res.status(201).json({ success: true, categories });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getAdminProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    return res.status(201).json({ success: true, products });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product id is required" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, price, category, stock } = req.body;
    const photo = req.file;

    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    if (photo) {
      rm(product.photo!, () => {
        console.log("Old Photo Deleted");
      });
      product.photo = photo.path;
    }

    if (title) product.title = title;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    await product.save();

    return res.status(201).json({ success: true, message: "Product updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product id is required" });
    }

    const product = await Product.findByIdAndDelete(id);

    if (product?.photo) {
      rm(product.photo!, () => {
        console.log("Old Photo Deleted");
      });
    }

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(201).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { search, sort, category, price } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = limit * (page - 1);

    const baseQuery: BaseQuery = {};

    if (typeof search === "string") {
      baseQuery.title = { $regex: search, $options: "i" };
    }

    if (typeof price === "string") {
      baseQuery.price = {
        $lte: Number(price),
      };
    }

    if (typeof category === "string") {
      baseQuery.category = category;
    }

    const productsPromise = Product.find(baseQuery)
      .sort(sort && { price: sort === "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip);

    const [products, filteredOnlyProduct] = await Promise.all([
      productsPromise,
      Product.find(baseQuery),
    ]);

    const totalPage = Math.ceil(filteredOnlyProduct.length / limit);

    return res.status(200).json({
      success: true,
      products,
      totalPage,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
