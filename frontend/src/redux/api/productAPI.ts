import { AllProductsResponse, ProductResponse } from "./../../types/userapi.d";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKENDSERVER_URL}/api/v1/product`,
  }),
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "latest",
    }),
    productDetails: builder.query<ProductResponse, string>({
      query: (id) => id,
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `admin-products?id=${id}`,
    }),
  }),
});


export const { useLatestProductsQuery, useProductDetailsQuery ,useAllProductsQuery} = productAPI;