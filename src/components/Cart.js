import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/pedidos/carrito",
          { withCredentials: true }
        );
        setCartData(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    };

    fetchCartItems();
  }, []);

  if (errorMessage) {
    return <p style={{ color: "red" }}>{errorMessage}</p>;
  }

  if (!cartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        <ul className="cart-list">
          {cartData.productos.map((item) => (
            <li key={item.productoId} className="cart-item">
              <img
                src={`data:image/jpeg;base64,${item.imagen}`}
                alt={item.nombreProducto}
                className="cart-image"
              />
              <div className="cart-details">
                <h3>{item.nombreProducto}</h3>
                <p>Unit Price: ${item.precio}</p>
                <p>Quantity: {item.cantidad}</p>
                <p>Total: ${item.precio * item.cantidad}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <h3>Total Price: ${cartData.precioTotal}</h3>
        </div>
      </div>
    </div>
  );
};

export default Cart;
