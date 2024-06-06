import React from "react";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="max-w-xs bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 mx-auto">
      <img
        className="w-full h-48 object-contain"
        src={product.image}
        alt={product.title}
      />
      <div className="p-4 flex flex-col justify-between h-48">
        <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
        <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
