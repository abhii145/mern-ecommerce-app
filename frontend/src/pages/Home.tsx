import React from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { Loader } from "../components";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { Product } from "../types";

const Home: React.FC = () => {
  const { data,isLoading } = useLatestProductsQuery("");

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.products.map((product: Product) => (
        <Link to={`/product/${product._id}`}>
          <ProductCard key={product._id} product={product} />
        </Link>
      ))}
    </div>
  );
};

export default Home;
