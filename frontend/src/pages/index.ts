import { lazy } from "react";

const Home = lazy(() => import("./Home"));
const Search = lazy(() => import("./Search"));
const Cart = lazy(() => import("./Cart"));

const Coupon = lazy(() => import("../pages/admin/apps/Coupon"));

const Barcharts = lazy(() => import("../pages/admin/charts/Barcharts"));
const Linecharts = lazy(() => import("../pages/admin/charts/Linecharts"));
const Piecharts = lazy(() => import("../pages/admin/charts/Piecharts"));

const NewProducts = lazy(() => import("../pages/admin/management/NewProducts"));
const ProductManagement = lazy(
  () => import("../pages/admin/management/ProductManagement")
);
const TransactionManagement = lazy(
  () => import("../pages/admin/management/TransactionManagement")
);

const AdminLayout = lazy(() => import("../pages/admin/AdminLayout"));
const Customers = lazy(() => import("../pages/admin/Customers"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const Products = lazy(() => import("../pages/admin/Products"));
const Transaction = lazy(() => import("../pages/admin/Transaction"));

export { Home, Search, Cart };
export { AdminLayout, Customers, Dashboard, Products, Transaction };
export { Coupon };
export { Barcharts, Linecharts, Piecharts };
export { NewProducts, TransactionManagement, ProductManagement };
