import React, { useState, useEffect } from "react";
import WishlistCard from "../../components/WishlistCard";
import "./WishlistPage.css";

const WishlistPage = ({ wishlist, setWishlist, bag, setBag }) => {
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("token");

  const showMessage = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2000);
  };

  // Fetch wishlist from backend
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) return;
      try {
        const res = await fetch("https://adidas-backend-gftf.onrender.com/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch wishlist");
        const data = await res.json();
        setWishlist(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        showMessage(err.message);
        setWishlist([]);
      }
    };

    fetchWishlist();
  }, [token, setWishlist]); // ✅ token and setter added as dependencies

  return (
    <div className="user-wishlist-page">
      <div className="user-wishlist-header">
        <h2>MY WISHLIST</h2>
        <p>[{Array.isArray(wishlist) ? wishlist.length : 0}] ITEMS</p>
      </div>

      {!Array.isArray(wishlist) || wishlist.length === 0 ? (
        <div className="user-empty-state">
          <p>
            You haven't saved any items to your wishlist yet. Start shopping and add your favorite items to your wishlist.
          </p>
          <button
            className="user-get-started-btn"
            onClick={() => (window.location.href = "/")}
          >
            GET STARTED --
          </button>
        </div>
      ) : (
        <div className="user-wishlist-grid">
          {wishlist.map((product) => (
            <WishlistCard
              key={product._id} // ✅ unique key
              product={product}
              wishlist={wishlist}
              setWishlist={setWishlist}
              bag={bag}
              setBag={setBag}
              showMessage={showMessage}
            />
          ))}
        </div>
      )}

      {msg && <div className="user-toast-msg">{msg}</div>}
    </div>
  );
};

export default WishlistPage;
