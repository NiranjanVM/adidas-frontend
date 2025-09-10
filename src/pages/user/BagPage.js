import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BagPage.css";

const BagPage = ({ bag, setBag, orders, setOrders }) => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("token");

  const showMessage = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2000);
  };

  // Fetch bag from backend
  const fetchBag = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://adidas-backend-gftf.onrender.com/api/bag", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch bag");
      const data = await res.json();
      setBag(data.filter((item) => item.product));
    } catch (err) {
      console.error(err);
      showMessage(err.message);
      setBag([]);
    }
  };

  useEffect(() => {
    fetchBag();
    // eslint-disable-next-line
  }, []);

  // Handle checkout
  const handleCheckout = async () => {
    if (bag.length === 0) return;
    if (!token) {
      showMessage("Please login first");
      return;
    }

    const items = bag.map((item) => ({
      product: item.product._id,
      quantity: item.quantity || 1,
    }));

    const totalAmount = bag.reduce(
      (acc, item) => acc + item.product.price * (item.quantity || 1),
      0
    );

    try {
      const res = await fetch("http://adidas-backend-gftf.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items, totalAmount }),
      });
      if (!res.ok) throw new Error("Failed to place order");
      const newOrder = await res.json();

      // ✅ Clear bag in backend
      await fetch("http://adidas-backend-gftf.onrender.com/api/bag/clear", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders([...orders, newOrder]);
      setBag([]);
      showMessage("Order placed successfully 🛒");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      showMessage(err.message);
    }
  };

  // Update quantity in backend
  const handleQuantityChange = async (id, qty) => {
    try {
      const res = await fetch(`http://adidas-backend-gftf.onrender.com/api/bag/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: parseInt(qty) }),
      });
      if (!res.ok) throw new Error("Failed to update quantity");
      const updatedItem = await res.json();
      setBag(
        bag.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      );
    } catch (err) {
      console.error(err);
      showMessage(err.message);
    }
  };

  // Remove item from bag
  const handleRemove = async (id) => {
    try {
      const res = await fetch(`http://adidas-backend-gftf.onrender.com/api/bag/remove/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to remove item");
      setBag(bag.filter((item) => item._id !== id));
      showMessage("Removed from bag");
    } catch (err) {
      console.error(err);
      showMessage(err.message);
    }
  };

  const total = bag.reduce((acc, item) => {
    if (!item.product) return acc;
    return acc + item.product.price * (item.quantity || 1);
  }, 0);

  return (
    <div className="user-bag-page">
      <div className="user-bag-header">
        <h2>YOUR BAG</h2>
        <p>[{bag.length}] ITEMS</p>
      </div>

      {bag.length === 0 ? (
        <div className="user-empty-state">
          <p>
            Once you add something to your bag - it will appear here. Ready to
            get started?
          </p>
          <button
            className="user-get-started-btn"
            onClick={() => navigate("/")}
          >
            GET STARTED --
          </button>
        </div>
      ) : (
        <div className="user-bag-list">
          {bag.map((item) => (
            <div
              className="user-bag-item"
              key={item._id}
              onClick={() => navigate(`/product/${item.product._id}`)}
            >
              <span
                className="user-remove-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item._id);
                }}
              >
                ✕
              </span>

              <img
                src={item.product?.image}
                alt={item.product?.name}
                className="user-bag-img"
              />

              <div className="user-bag-info">
                <h3>{item.product?.name}</h3>
                <p>₹{item.product?.price}</p>

                <div className="user-bag-controls">
                  <label>Qty:</label>
                  <select
                    className="user-qty-select"
                    value={item.quantity || 1}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleQuantityChange(item._id, e.target.value)
                    }
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <span className="user-line-total">
                    ₹{(item.product?.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="user-bag-summary">
            <h3>Total: ₹{total.toFixed(2)}</h3>
            <button className="user-checkout-btn" onClick={handleCheckout}>
              CHECKOUT
            </button>
          </div>
        </div>
      )}

      {msg && <div className="user-toast-msg">{msg}</div>}
    </div>
  );
};

export default BagPage;
