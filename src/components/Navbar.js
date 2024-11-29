// src/components/Navbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../App.css";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Aquí haces la llamada para hacer logout y limpiar la sesión
      await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/product-list" className="navbar-link">
        Product List
      </Link>
      <Link to="/cart" className="navbar-link">
        Shopping Cart
      </Link>
      {user && user.roles.includes("ROLE_ADMIN") && (
        <Link to="/add-product" className="navbar-link">
          Add Product
        </Link>
      )}
      {user ? (
        <button onClick={handleLogout} className="navbar-button">
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" className="navbar-link">
            Login
          </Link>
          <Link to="/register" className="navbar-link">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
