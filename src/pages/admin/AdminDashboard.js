import React, { useRef, useEffect, useState } from "react";
import EditProductPopup from "../../components/EditProductPopup";
import "./AdminDashboard.css";

const API_URL = "https://adidas-backend-gftf.onrender.com/api/products";

const AdminDashboard = ({ products, setProducts, searchTarget, setSearchTarget }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [msg, setMsg] = useState("");
  const cardRefs = useRef({});
  const token = localStorage.getItem("token");

  const showMessage = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2000);
  };

  // 🔎 Scroll to searched product
  useEffect(() => {
    if (!searchTarget || products.length === 0) return;

    const timeout = setTimeout(() => {
      const el = cardRefs.current[searchTarget];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("highlight");
        setTimeout(() => el.classList.remove("highlight"), 2000);
      }
      setSearchTarget(null); // reset after scroll
    }, 100);

    return () => clearTimeout(timeout);
  }, [searchTarget, products, setSearchTarget]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
        showMessage("Product deleted");
      } else {
        const errData = await res.json();
        showMessage(errData.message || "Error deleting product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleSave = async (updatedProduct) => {
    try {
      const res = await fetch(`${API_URL}/${updatedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      });
      if (res.ok) {
        const newProduct = await res.json();
        setProducts(products.map((p) => (p._id === newProduct._id ? newProduct : p)));
        showMessage("Product updated");
      } else {
        const errData = await res.json();
        showMessage(errData.message || "Error updating product");
      }
    } catch (err) {
      console.error("Error updating product:", err);
    }
    setEditingProduct(null);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>ADMIN</h2>
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <div
            key={p._id}
            ref={(el) => (cardRefs.current[p._id] = el)}
            className="product-card"
          >
            <img src={p.image} alt={p.name} className="product-img" />
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <div className="product-actions">
              <button className="edit-btn" onClick={() => setEditingProduct(p)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => handleDelete(p._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <EditProductPopup
          product={editingProduct}
          onSave={handleSave}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {msg && <div className="aadmin-toast-msg">{msg}</div>}
    </div>
  );
};

export default AdminDashboard;
