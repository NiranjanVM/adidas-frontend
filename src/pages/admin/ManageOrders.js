import React, { useState, useEffect } from "react";
import "./ManageOrders.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("token");

  const showMessage = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2000);
  };

  // Fetch all orders (admin)
  const fetchOrders = async () => {
    if (!token) return showMessage("Please login first");
    try {
      const res = await fetch(
        "https://adidas-backend-gftf.onrender.com/api/orders/admin",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      showMessage(err.message);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cancel order (works for user or admin)
  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await fetch(
        `https://adidas-backend-gftf.onrender.com/api/orders/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to cancel order");
      }

      // Remove order from local state
      setOrders((prev) => prev.filter((order) => order._id !== id));
      showMessage("Order canceled!");
    } catch (err) {
      console.error(err);
      showMessage(err.message);
    }
  };

  // Toggle status
  const toggleStatus = async (id) => {
    const order = orders.find((o) => o._id === id);
    if (!order) return;

    let newStatus = "Pending";
    if (order.status === "Pending") newStatus = "Shipped";
    else if (order.status === "Shipped") newStatus = "Delivered";

    try {
      const res = await fetch(
        `https://adidas-backend-gftf.onrender.com/api/orders/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error("Failed to update status");
      setOrders(
        orders.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
      );
      showMessage("Status updated!");
    } catch (err) {
      console.error(err);
      showMessage(err.message);
    }
  };

  const total = orders.reduce(
    (acc, order) =>
      acc + order.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    0
  );

  return (
    <div className="admin-orders-page">
      <div className="admin-orders-header">
        <h2>Manage Orders</h2>
        <p>[{orders.length}] ORDERS</p>
      </div>

      {orders.length === 0 ? (
        <div className="admin-empty-state">
          <p>No orders yet.</p>
        </div>
      ) : (
        <div className="admin-orders-list">
          {orders.map((order) => (
            <div className="admin-order-card" key={order._id}>
              <div className="admin-order-items">
                {order.items.map((item) => (
                  <div className="admin-order-item" key={item._id}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="admin-order-img"
                    />
                    <div className="admin-order-info">
                      <h3>{item.product.name}</h3>
                      <p>Price: ₹{item.product.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>
                        Total: ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="admin-order-footer">
                <span
                  className={`admin-order-status ${
                    order.status === "Pending"
                      ? "pending"
                      : order.status === "Shipped"
                      ? "shipped"
                      : "delivered"
                  }`}
                >
                  {order.status}
                </span>
                <div className="admin-order-footer-buttons">
                  <button
                    className="admin-toggle-btn"
                    onClick={() => toggleStatus(order._id)}
                  >
                    Toggle Status
                  </button>
                  <button
                    className="admin-cancel-btn"
                    onClick={() => handleCancel(order._id)}
                  >
                    CANCEL ORDER
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="admin-orders-summary">
            <h3>Grand Total: ₹{total.toFixed(2)}</h3>
          </div>
        </div>
      )}

      {msg && <div className="admin-toast-msg">{msg}</div>}
    </div>
  );
};

export default ManageOrders;
