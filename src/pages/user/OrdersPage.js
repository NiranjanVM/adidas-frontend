import React, { useState, useEffect } from "react";
import "./OrdersPage.css";

const OrdersPage = ({ orders, setOrders }) => {
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("token");

  const showMessage = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2000);
  };

  // Fetch user orders
  const fetchOrders = async () => {
    if (!token) return showMessage("Please login first");
    try {
      const res = await fetch("http://adidas-backend-gftf.onrender.com/api/orders/myorders", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    // eslint-disable-next-line
  }, []);

  // Cancel order
  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const res = await fetch(`http://adidas-backend-gftf.onrender.com/api/orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to cancel order");
      }

      setOrders((prev) => prev.filter((order) => order._id !== id));
      showMessage("Order canceled!");
    } catch (err) {
      console.error(err);
      showMessage(err.message);
    }
  };

  // Calculate grand total
  const total = orders.reduce(
    (acc, order) =>
      acc +
      order.items.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
      ),
    0
  );

  return (
    <div className="user-orders-page">
  <div className="user-orders-header">
  <h2>YOUR ORDERS</h2>
  <p className="user-orders-count">[{orders.length}] ORDERS</p>
</div>


      {orders.length === 0 ? (
        <div className="user-empty-state">
          <p>
            Once you place an order – it will appear here. Ready to get started?
          </p>
          <button
            className="user-get-started-btn"
            onClick={() => (window.location.href = "/")}
          >
            GET STARTED --
          </button>
        </div>
      ) : (
        <div className="user-orders-list">
          {orders.map((order) => (
            <div className="user-order-card" key={order._id}>
              <div className="user-order-items">
                {order.items.map((item) => (
                  <div className="user-order-item" key={item._id}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="user-order-img"
                    />
                    <div className="user-order-info">
                      <h3>{item.product.name}</h3>
                      <p>Price: ₹{item.product.price}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>
                        Total: ₹
                        {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="user-order-footer">
                <span
                  className={`user-order-status ${
                    order.status === "Pending"
                      ? "pending"
                      : order.status === "Shipped"
                      ? "shipped"
                      : "delivered"
                  }`}
                >
                  {order.status}
                </span>

                {order.status === "Pending" && (
                  <button
                    className="user-cancel-btn"
                    onClick={() => handleCancel(order._id)}
                  >
                    CANCEL ORDER
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="user-orders-summary">
            <h3>Grand Total: ₹{total.toFixed(2)}</h3>
          </div>
        </div>
      )}

      {msg && <div className="user-toast-msg">{msg}</div>}
    </div>
  );
};

export default OrdersPage;
