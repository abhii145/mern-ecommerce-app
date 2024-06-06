import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AdminLayout,
  Barcharts,
  Cart,
  Coupon,
  Customers,
  Dashboard,
  Home,
  Linecharts,
  NewProducts,
  ProductManagement,
  Products,
  TransactionManagement,
  Transaction,
  Piecharts,
  Search,
  Shipping,
} from "./pages";
import { Suspense } from "react";
import { Loader, UserLayout } from "./components";
import ProductDetails from "./components/ProductDetails";

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>

          {/* LoggedIn user Routes */}
          <Route path="/shipping" element={<Shipping />} />

          {/* Admin Routes with Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product" element={<Products />} />
            <Route path="transactions" element={<Transaction />} />
            <Route path="customers" element={<Customers />} />
            <Route path="product/new" element={<NewProducts />} />
            <Route path="product/:id" element={<ProductManagement />} />
            <Route path="transaction/:id" element={<TransactionManagement />} />
            <Route path="chart/bar" element={<Barcharts />} />
            <Route path="chart/line" element={<Linecharts />} />
            <Route path="chart/pie" element={<Piecharts />} />
            <Route path="app/coupon" element={<Coupon />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
