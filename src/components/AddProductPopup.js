// AddProductPopup.js
import React, { useState } from "react";
import "./AddProductPopup.css";

const AddProductPopup = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    discount: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) {
      alert("Please fill required fields!");
      return;
    }

    const newProduct = {
      ...form,
      price: parseFloat(form.price),
      discount: parseFloat(form.discount) || 0,
    };

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("https://adidas-backend-gftf.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      const data = await res.json();
      onSave?.(data); // send product back to AdminDashboard
      onClose();
    } catch (err) {
      console.error("❌ Add product error:", err);
      alert("Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-popup-overlay">
      <div className="admin-popup-content">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount %"
            value={form.discount}
            onChange={handleChange}
          />
          <button type="submit" className="admin-save-btn" disabled={loading}>
            {loading ? "Adding..." : "ADD"}
          </button>
        </form>
        <button className="admin-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default AddProductPopup;
