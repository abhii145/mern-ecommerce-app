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
} from "./pages";
import { Suspense } from "react";
import { Loader } from "./components";
import Transactions from "./pages/admin/Transaction";
import PieCharts from "./pages/admin/charts/Piecharts";

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />

          {/* Admin Routes with Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product" element={<Products />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="customers" element={<Customers />} />
            <Route path="product/new" element={<NewProducts />} />
            <Route path="product/:id" element={<ProductManagement />} />
            <Route path="transaction/:id" element={<TransactionManagement />} />
            <Route path="chart/bar" element={<Barcharts />} />
            <Route path="chart/line" element={<Linecharts />} />
            <Route path="chart/pie" element={<PieCharts />} />
            <Route path="app/coupon" element={<Coupon />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
