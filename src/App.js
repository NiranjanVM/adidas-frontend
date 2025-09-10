// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Footer from "./components/Footer";

// User Pages
import HomePage from "./pages/user/HomePage";
import ProductDetailsPage from "./pages/user/ProductDetailsPage";
import WishlistPage from "./pages/user/WishlistPage";
import BagPage from "./pages/user/BagPage";
import OrdersPage from "./pages/user/OrdersPage";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageOrders from "./pages/admin/ManageOrders";

function AppWrapper() {
  const location = useLocation();
  const hideNavFooter = location.pathname === "/login" || location.pathname === "/register";

  // User states
  const [wishlist, setWishlist] = useState([]);
  const [bag, setBag] = useState([]);
  const [orders, setOrders] = useState([]);

  // 🔑 Auth state
  const [currentUser, setCurrentUser] = useState(null);

  // Admin states
  const [adminProducts, setAdminProducts] = useState([]);
  const [searchTarget, setSearchTarget] = useState(null);

  // Fetch products ONCE for both Navbar + Dashboard
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://adidas-backend-gftf.onrender.com/api/products");
        const data = await res.json();
        setAdminProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // On refresh, auto-load user from localStorage
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) setCurrentUser(role);
  }, []);

  return (
    <>
      {/* User Navbar */}
      {!hideNavFooter && !location.pathname.startsWith("/admin") && (
        <Navbar
          products={adminProducts}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<HomePage wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/product/:id" element={<ProductDetailsPage bag={bag} setBag={setBag} />} />
        <Route
          path="/wishlist"
          element={
            <WishlistPage
              wishlist={wishlist}
              setWishlist={setWishlist}
              bag={bag}
              setBag={setBag}
            />
          }
        />
        <Route
          path="/bag"
          element={<BagPage bag={bag} setBag={setBag} orders={orders} setOrders={setOrders} />}
        />
        <Route path="/orders" element={<OrdersPage orders={orders} setOrders={setOrders} />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

        <Route
          path="/admin/dashboard"
          element={
            <>
              <AdminNavbar
                products={adminProducts}
                setProducts={setAdminProducts}
                onSearchSelect={setSearchTarget}
              />
              <AdminDashboard
                products={adminProducts}
                setProducts={setAdminProducts}
                searchTarget={searchTarget}
                setSearchTarget={setSearchTarget}
              />
            </>
          }
        />

        <Route
          path="/admin/manage-orders"
          element={
            <>
              <AdminNavbar
                products={adminProducts}
                setProducts={setAdminProducts}
                onSearchSelect={setSearchTarget}
              />
              <ManageOrders />
            </>
          }
        />
      </Routes>

      {/* User Footer */}
      {!hideNavFooter && !location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
