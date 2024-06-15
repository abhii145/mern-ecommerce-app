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
  Orders,
  Login,
} from "./pages";
import { onAuthStateChanged } from "firebase/auth";
import { Suspense, useEffect } from "react";
import { Loader, UserLayout } from "./components";
import ProductDetails from "./components/ProductDetails";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { userExist, userNotExist } from "./redux/reducer/useReducer";
import { getUser } from "./redux/api/userAPI";
import { RootState } from "./redux/store";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";

const App = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state: RootState) => state.userReducer
  );




  useEffect(() => {
    onAuthStateChanged(auth, async (user: { uid: string; }) => {
      if (user) {
        const data = await getUser(user.uid);
        console.log(data);
        dispatch(userExist(data.user));
      } else dispatch(userNotExist());
    });
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <Router>
      <Toaster position="bottom-center" />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>
          {/* Not logged In Route */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />
          {/* Logged In User Routes */}{" "}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<Orders />} />
          </Route>
          {/* Admin Routes with Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={true}
                  adminOnly
                  admin={user?.role === "admin" ? true : false}
                />
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="product" element={<Products />} />
              <Route path="transactions" element={<Transaction />} />
              <Route path="customers" element={<Customers />} />
              <Route path="product/new" element={<NewProducts />} />
              <Route path="product/:id" element={<ProductManagement />} />
              <Route
                path="transaction/:id"
                element={<TransactionManagement />}
              />
              <Route path="chart/bar" element={<Barcharts />} />
              <Route path="chart/line" element={<Linecharts />} />
              <Route path="chart/pie" element={<Piecharts />} />
              <Route path="app/coupon" element={<Coupon />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
