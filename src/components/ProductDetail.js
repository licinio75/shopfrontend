import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";
import "../App.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleAddToCart = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/pedidos/agregar-producto?productoId=${id}&cantidad=${cantidad}`,
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/cart", {
        state: { message: "Product added to cart successfully." },
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

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

        {user && !user.roles.includes("ROLE_ADMIN") && (
          <div className="add-to-cart-container">
            <label htmlFor="cantidad">Quantity:</label>
            <input
              type="number"
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              min="1"
              max={product.stock}
              className="quantity-input"
            />
            <button onClick={handleAddToCart} className="add-to-cart-button">
              Add to Cart
            </button>
          </div>
        )}

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ProductDetail;
