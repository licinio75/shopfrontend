// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        email: email,
        password: password,
        nombre: nombre
      });
      console.log('Registration Successful:', response.data);
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
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
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Register;
