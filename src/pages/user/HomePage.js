import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import "./HomePage.css";

const API_URL = "https://adidas-backend-gftf.onrender.com/api/products";

const HomePage = ({ wishlist, setWishlist }) => {
  const [msg, setMsg] = useState("");
  const [products, setProducts] = useState([]);

  const showMessage = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2000);
  };

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="user-home-page">
      <div className="user-title-row">
        <h1>SHOES</h1>
        <p>[{products.length}]</p>
      </div>

      <div className="user-product-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id} // ✅ use _id from backend
            product={product}
            wishlist={wishlist}
            setWishlist={setWishlist}
            showMessage={showMessage}
          />
        ))}
      </div>

      {msg && <div className="user-toast-msg">{msg}</div>}
    </div>
  );
};

export default HomePage;
