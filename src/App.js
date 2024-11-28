// src/App.js
import "./App.css";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import axios from "axios";

function Home() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <h1>Welcome</h1>
        <button onClick={() => (window.location.href = "/login")}>Login</button>
        <button onClick={() => (window.location.href = "/register")}>
          Register
        </button>
      </div>
    );
  } else if (user.roles.includes("ROLE_ADMIN")) {
    return (
      <div className="container">
        <h1>Admin Dashboard</h1>
        <button onClick={() => (window.location.href = "/product-list")}>
          Product List
        </button>
        <button onClick={() => (window.location.href = "/add-product")}>
          Add Product
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>User Dashboard</h1>
        <button onClick={() => (window.location.href = "/product-list")}>
          Product List
        </button>
        <button onClick={() => (window.location.href = "/cart")}>
          Shopping Cart
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
}

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/product-list"
            element={
              <RequireAuth>
                <ProductList />
              </RequireAuth>
            }
          />
          <Route
            path="/add-product"
            element={
              <RequireAuth>
                <AddProduct />
              </RequireAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
