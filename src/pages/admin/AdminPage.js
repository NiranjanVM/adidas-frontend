import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminDashboard from "./AdminDashboard";

const API_URL = "https://adidas-backend-gftf.onrender.com/api/products";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTarget, setSearchTarget] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <AdminNavbar
        products={products}
        setProducts={setProducts}
        onSearchSelect={(id) => setSearchTarget(id)}
      />
      <AdminDashboard
        products={products}
        setProducts={setProducts}
        searchTarget={searchTarget}
      />
    </>
  );
};

export default AdminPage;
