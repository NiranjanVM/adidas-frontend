import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import "./ProductDetailsPage.css";

const API_URL = "http://adidas-backend-gftf.onrender.com/api/products";
const REVIEW_API = "http://adidas-backend-gftf.onrender.com/api/reviews";

const ProductDetailsPage = ({ bag, setBag }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [addedToBag, setAddedToBag] = useState(false);
  const [review, setReview] = useState("");
  const [msg, setMsg] = useState("");

  const showMessage = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2000);
  };

  // Fetch product and reviews
  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const [prodRes, revRes] = await Promise.all([
          fetch(`${API_URL}/${id}`),
          fetch(`${REVIEW_API}/${id}`)
        ]);

        if (!prodRes.ok) throw new Error("Failed to fetch product");
        if (!revRes.ok) throw new Error("Failed to fetch reviews");

        const prodData = await prodRes.json();
        const revData = await revRes.json();

        setProduct(prodData);
        setReviews(revData);
      } catch (err) {
        console.error(err);
        showMessage(err.message);
      }
    };

    fetchProductAndReviews();
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  // Add to bag
  const handleAddToBag = async (e) => {
    e.stopPropagation();
    if (!token) return showMessage("Please login first");

    try {
      const res = await fetch("http://adidas-backend-gftf.onrender.com/api/bag/add", {
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

  // Submit review
  const handleAddReview = async () => {
    if (!review.trim()) return;
    if (!token) return showMessage("Please login first");

    try {
      const res = await fetch(`${REVIEW_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id, comment: review }),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      const newReview = await res.json();
      setReviews((prev) => [...prev, newReview]);
      setReview("");
      showMessage("Review added");
    } catch (err) {
      console.error(err);
      showMessage(err.message);
    }
  };

  return (
    <div className="user-product-details">
      <div className="user-product-main">
        <div className="user-image-container">
          <img src={product.image} alt={product.name} />

          <div className="user-add-icon" onClick={handleAddToBag}>
            <BiShoppingBag size={28} color="black" />
          </div>

          {addedToBag && (
            <button
              className="user-view-bag"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/bag");
              }}
            >
              VIEW BAG
            </button>
          )}
        </div>

        <div className="user-details">
          <h2>{product.name}</h2>
          <p className="user-price">₹{product.price}</p>
          {product.category && <p className="user-category">{product.category}</p>}
          {product.description && <p className="user-description">{product.description}</p>}

          <div className="user-reviews-section">
            <h3>Reviews</h3>
            <div className="user-reviews-list">
              {reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                reviews.map((r) => (
                  <div key={r._id} className="user-review">
                    <strong>{r.user.username || "User"}:</strong> {r.comment}
                  </div>
                ))
              )}
            </div>

            <div className="user-add-review">
              <input
                type="text"
                placeholder="Write a review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <button onClick={handleAddReview}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      {msg && <div className="user-toast-msg">{msg}</div>}
    </div>
  );
};

export default ProductDetailsPage;
