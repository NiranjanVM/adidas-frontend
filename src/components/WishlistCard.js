import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./WishlistCard.css";

const WishlistCard = ({ product, wishlist, setWishlist, bag, setBag, showMessage }) => {
  const navigate = useNavigate();
  const [addedToBag, setAddedToBag] = useState(false);
  const token = localStorage.getItem("token");

  // Remove from wishlist (backend)
  const removeFromWishlist = async () => {
    if (!token) return showMessage("Please login first");

    try {
      const res = await fetch(`https://adidas-backend-gftf.onrender.com/api/wishlist/remove/${product._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setWishlist(wishlist.filter((item) => item._id !== product._id));
        showMessage("Removed from wishlist");
      } else {
        showMessage("Failed to remove from wishlist");
      }
    } catch (err) {
      console.error(err);
      showMessage("Error removing item");
    }
  };

  // Add to bag (backend)
  const addToBag = async (e) => {
  e.stopPropagation();
  if (!token) return showMessage("Please login first");

  try {
    const res = await fetch("https://adidas-backend-gftf.onrender.com/api/bag/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: product._id, quantity: 1 }),
    });

    if (res.ok) {
      const addedItem = await res.json();

      setBag((prevBag) => {
        const exists = prevBag.find((item) => item._id === addedItem._id);
        if (exists) {
          showMessage("Already in bag");
          return prevBag;
        } else {
          showMessage("Added to bag");
          return [...prevBag, addedItem];
        }
      });

      setAddedToBag(true);
    } else {
      const errData = await res.json();
      showMessage(errData.message || "Failed to add to bag");
    }
  } catch (err) {
    console.error(err);
    showMessage("Error adding to bag");
  }
};



  return (
    <div
      className="user-wishlist-card"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img src={product.image} alt={product.name} />

      <div className="user-wishlist-icons">
        <AiFillHeart
          size={24}
          color="black"
          className="user-icon-btn"
          onClick={(e) => {
            e.stopPropagation();
            removeFromWishlist();
          }}
        />
        <BiShoppingBag
          size={24}
          className="user-icon-btn"
          onClick={addToBag}
        />
      </div>

      <div className="user-price-overlay">
        <p>
          ₹{product.price} <span className="user-discount">{product.discount}% OFF</span>
        </p>
      </div>

      {addedToBag && (
        <button
          className="user-view-bag-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/bag");
          }}
        >
          VIEW BAG
        </button>
      )}
    </div>
  );
};

export default WishlistCard;
