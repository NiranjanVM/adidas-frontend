import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, wishlist, setWishlist, showMessage }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Track if the product is in wishlist
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const exists = Array.isArray(wishlist) && wishlist.some(item => item._id === product._id);
    setInWishlist(exists);
  }, [wishlist, product._id]);

  const toggleWishlist = async (e) => {
    e.stopPropagation();
    if (!token) return showMessage("Please login first");

    try {
      let res;
      if (inWishlist) {
        // remove
        res = await fetch(`https://adidas-backend-gftf.onrender.com/api/wishlist/remove/${product._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // add
        res = await fetch("https://adidas-backend-gftf.onrender.com/api/wishlist/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: product._id }),
        });
      }

      if (!res.ok) throw new Error("Failed to update wishlist");

      const updatedWishlist = await res.json();
      setWishlist(updatedWishlist);
      showMessage(inWishlist ? "Removed from wishlist" : "Added to wishlist");
    } catch (err) {
      console.error(err);
      showMessage("Error updating wishlist");
    }
  };

  return (
    <div className="user-product-card" onClick={() => navigate(`/product/${product._id}`)}>
      <div
        className={`user-heart-icon ${inWishlist ? "active" : ""}`}
        onClick={toggleWishlist}
      >
        {inWishlist ? <AiFillHeart color="black" size={24} /> : <AiOutlineHeart color="black" size={24} />}
      </div>

      <img src={product.image} alt={product.name} />

      <div className="user-product-info">
        
        <p className="user-price">
          ₹{product.price} <span className="user-discount">{product.discount}% OFF</span>
        </p>
        <p className="user-product-name">{product.name}</p>
        {product.category && <p className="user-category">{product.category}</p>}
        {product.description && <p className="user-description">{product.description}</p>}
      </div>
    </div>
  );
};

export default ProductCard;
