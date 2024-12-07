// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, senha });
      localStorage.setItem('token', response.data.token);
      alert("Login bem-sucedido!");
    } catch (error) {
      console.error('Erro no login:', error);
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginPage;
