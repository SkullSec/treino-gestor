// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/alunos/register', { nome, email, senha });
      alert(response.data.message);
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default RegisterPage;
