/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api/productAPI";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, data } = useProductDetailsQuery(id as string);

  const addToCart = () => {
    alert("added");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 mt-20 animate-pulse">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
          <div className="w-full max-w-sm h-64 bg-gray-200 mb-4 lg:mb-0"></div>
          <div className="max-w-lg w-full flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-10 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return <div className="text-center">Product not found</div>;

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
        <img
          src={data?.product.photo}
          alt={data?.product.title}
          className="w-full max-w-sm h-auto object-cover mb-4 lg:mb-0"
          loading="lazy"
        />
        <div className="max-w-lg w-full flex flex-col justify-between h-full">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-center lg:text-left">
              {data?.product.title}
            </h1>
            <p className="text-gray-800 mb-4">{data?.product.description}</p>
            <p className="text-gray-600 mb-4">
              Category: {data?.product.category}
            </p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-semibold text-gray-900">
              ${data?.product.price.toFixed(2)}
            </span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
