import React, { useState, useRef, useEffect } from "react";
import {
  AiOutlineHeart,
  AiOutlineBook,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import { BiShoppingBag, BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import adidasLogo from "../assets/adidas-logo.png";

const Navbar = ({ currentUser, setCurrentUser }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const searchBoxRef = useRef(null);
  const searchIconRef = useRef(null);
  const navigate = useNavigate();

  // 🔄 Sync user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("role"); // role is stored at login
    if (storedUser && !currentUser) {
      setCurrentUser(storedUser);
    }
  }, [currentUser, setCurrentUser]);

  useEffect(() => {
    if (showSearch && inputRef.current) inputRef.current.focus();
  }, [showSearch]);

  // 🔍 Fetch products from backend on query
  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      try {
        const res = await fetch(
          `http://adidas-backend-gftf.onrender.com/api/products/search?q=${query}`
        );
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    const delayDebounce = setTimeout(fetchResults, 300); // debounce
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Close search when clicking outside
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

  // ✅ Logout clears state + localStorage
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <nav className="user-navbar">
      <div className="user-logo">
        <Link to="/">
          <img src={adidasLogo} alt="Adidas Logo" />
        </Link>
      </div>

      <div className="user-nav-icons">
        {/* 🔍 Search */}
        <div className={`user-search-container ${showSearch ? "active" : ""}`}>
          <AiOutlineSearch
            ref={searchIconRef}
            title="Search"
            className="user-icon-btn"
            onClick={() => setShowSearch(!showSearch)}
          />
          {showSearch && (
            <div className="user-search-box" ref={searchBoxRef}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                className="user-search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <div className="user-search-results">
                  {results.length > 0 ? (
                    results.map((p) => (
                      <div
                        key={p._id}
                        className="user-search-item"
                        onClick={() => {
                          navigate(`/product/${p._id}`);
                          setQuery("");
                          setShowSearch(false);
                        }}
                      >
                        <img src={p.image} alt={p.name} />
                        <span>{p.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="user-no-result">No products found</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ❤️ Wishlist */}
        <Link to="/wishlist">
          <AiOutlineHeart title="Wishlist" />
        </Link>

        {/* 🛍️ Bag */}
        <Link to="/bag">
          <BiShoppingBag title="Bag" />
        </Link>

        {/* 📦 Orders */}
        <Link to="/orders">
          <AiOutlineBook title="Orders" />
        </Link>

        {/* 👤 or 🚪 depending on login */}
        {currentUser ? (
          <BiLogOut
            title="Logout"
            className="user-icon-btn"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <Link to="/login">
            <AiOutlineUser
              title="Login/Register"
              className="user-icon-btn"
              style={{ cursor: "pointer" }}
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
