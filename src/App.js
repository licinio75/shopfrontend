import "./App.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import axios from "axios";
import Navbar from "./components/Navbar";

function Home() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirigir al login si no hay usuario en sesión
      navigate("/login");
    }
  }, [user, navigate]);

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
    return null;
  }
}

function AppContent() {
  const location = useLocation();

  return (
    <div>
      {/* Mostrar Navbar excepto en las páginas de login y registro */}
      {!(
        location.pathname === "/login" || location.pathname === "/register"
      ) && <Navbar />}
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
          path="/product-detail/:id"
          element={
            <RequireAuth>
              <ProductDetail />
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
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
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
