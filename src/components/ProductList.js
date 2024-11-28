// src/components/ProductList.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Obtener el mensaje de redirección si existe
  const message = location.state?.message;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/productos/list"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <div className="product-list">
      {message && <p className="message">{message}</p>}
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="product-item"
            onClick={() => handleProductClick(product.id)}
          >
            <img
              src={`data:image/jpeg;base64,${product.imagen}`}
              alt={product.nombre}
              className="product-image"
            />
            <div className="product-details">
              <h3>{product.nombre}</h3>
              <p>Price: ${product.precio}</p>
            </div>
          </li>
        ))}
      </ul>
      {user && user.roles.includes("ROLE_ADMIN") && (
        <button
          onClick={() => navigate("/add-product")}
          className="add-product-button"
        >
          Add Product
        </button>
      )}
    </div>
  );
};

export default ProductList;
