import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import AddProductPopup from "./AddProductPopup";
import "./AdminNavbar.css";
import adidasLogo from "../assets/adidas-logo.png";

const AdminNavbar = ({ products = [], setProducts, onSearchSelect }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [msg, setMsg] = useState("");
  const inputRef = useRef(null);

  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const searchBoxRef = useRef(null);
  const searchIconRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (showSearch && inputRef.current) inputRef.current.focus();
  }, [showSearch]);

  // Close menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  // Close search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showSearch &&
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target) &&
        searchIconRef.current &&
        !searchIconRef.current.contains(e.target)
      ) {
        setShowSearch(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  const showMessage = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2000);
  };

  const filtered = Array.isArray(products)
    ? products.filter((p) => (p.name || "").toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setShowMenu(false);
    navigate("/login");
  };

  const handleSearchClick = (id) => {
    if (onSearchSelect) onSearchSelect(id); // Only scroll, no edit popup
    setQuery("");
    setShowSearch(false);
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-logo">
        <Link to="/admin/dashboard">
          <img src={adidasLogo} alt="Admin Logo" />
        </Link>
      </div>

      <div className="admin-nav-center">
        <AiOutlineSearch
          ref={searchIconRef}
          className="admin-icon-btn"
          onClick={() => setShowSearch(!showSearch)}
        />
        {showSearch && (
          <div className="admin-search-box" ref={searchBoxRef}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="admin-search-input"
            />
            {query && (
              <div className="admin-search-results">
                {filtered.length > 0 ? (
                  filtered.map((p) => (
                    <div
                      key={p._id}
                      className="admin-search-item"
                      onClick={() => handleSearchClick(p._id)}
                    >
                      <img src={p.image} alt={p.name} />
                      <span>{p.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="admin-no-result">No products found</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="admin-nav-icons">
        <GiHamburgerMenu
          ref={hamburgerRef}
          className="admin-icon-btn"
          onClick={() => setShowMenu(!showMenu)}
        />
        {showMenu && (
          <div className="admin-menu-dropdown" ref={menuRef}>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/manage-orders">Manage Orders</Link>
            <button
              onClick={() => {
                setShowAddPopup(true);
                setShowMenu(false);
              }}
            >
              Add Product
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>

      {showAddPopup && (
        <AddProductPopup
          onClose={() => setShowAddPopup(false)}
          onSave={(product) => {
            setProducts([...products, product]);
            setShowAddPopup(false);
            showMessage("Product added");
          }}
        />
      )}

      {msg && <div className="aadmin-toast-msg">{msg}</div>}
    </nav>
  );
};

export default AdminNavbar;
