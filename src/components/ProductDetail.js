// src/components/ProductDetail.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/productos/${id}`,
          { withCredentials: true }
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    };

    fetchProduct();
  }, [id]);

  if (errorMessage) {
    return <p style={{ color: "red" }}>{errorMessage}</p>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="product-detail">
        <h2>{product.nombre}</h2>
        <img
          src={`data:image/jpeg;base64,${product.imagen}`}
          alt={product.nombre}
          className="product-image"
        />
        <p>{product.descripcion}</p>
        <p>Price: ${product.precio}</p>
        <p>Stock: {product.stock}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
