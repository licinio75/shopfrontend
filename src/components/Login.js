// src/components/Login.js
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../App.css"; // Asegúrate de importar el archivo CSS

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, loading } = useContext(AuthContext);

  // Obtener el mensaje de redirección si existe
  const message = location.state?.message;

  useEffect(() => {
    if (!loading && user) {
      navigate("/"); // Redirigir al dashboard si el usuario ya está logado
    }
  }, [user, navigate, loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Limpiar errores previos

    try {
      await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      // Obtener la información del usuario después del login
      const userInfoResponse = await axios.get(
        "http://localhost:8080/api/auth/user",
        { withCredentials: true }
      );
      setUser(userInfoResponse.data);

      console.log("Login Successful");
      navigate("/"); // Redirigir al dashboard después del login
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data); // Mensaje de error personalizado
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Mostrar mensaje de carga mientras se verifica el usuario
  }

  if (user) {
    return null; // O podría mostrar un mensaje de "Already logged in" mientras redirige
  }

  return (
    <div className="page-container">
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit">Login</button>
          <button type="button" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
