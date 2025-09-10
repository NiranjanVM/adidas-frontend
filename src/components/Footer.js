import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="user-footer">
      <div className="user-footer-sections">
        <div className="user-footer-col">
          <h4>PRODUCTS</h4>
          <ul>
            <li>Footwear</li>
            <li>Clothing</li>
            <li>Accessories</li>
            <li>Outlet-Sale</li>
            <li>New Arrivals</li>
            <li>Flat 50% Off!</li>
          </ul>
        </div>

        <div className="user-footer-col">
          <h4>SPORTS</h4>
          <ul>
            <li>Cricket</li>
            <li>Running</li>
            <li>Football</li>
            <li>Gym/Training</li>
            <li>Tennis</li>
            <li>Basketball</li>
          </ul>
        </div>

        <div className="user-footer-col">
          <h4>COLLECTIONS</h4>
          <ul>
            <li>Ultraboost</li>
            <li>Superstar</li>
            <li>Stan Smith</li>
            <li>Predator</li>
            <li>Adicolor</li>
          </ul>
        </div>

        <div className="user-footer-col">
          <h4>SUPPORT</h4>
          <ul>
            <li>Help</li>
            <li>Customer Services</li>
            <li>Returns & Exchanges</li>
            <li>Shipping</li>
            <li>Order Tracker</li>
          </ul>
        </div>

        <div className="user-footer-col">
          <h4>COMPANY INFO</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Store Finder</li>
          </ul>
        </div>

        <div className="user-footer-col">
          <h4>FOLLOW US</h4>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>

      <div className="user-footer-bottom">
        <p>Privacy Policy | Terms and Conditions | Cookies</p>
        <p>©2025 adidas India Marketing Pvt. Ltd</p>
      </div>
    </footer>
  );
}

export default Footer;
