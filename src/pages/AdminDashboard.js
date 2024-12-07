// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import AlunoList from '../components/AlunoList';

const AdminDashboard = () => {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await api.get('/alunos'); // Rota para listar alunos
        setAlunos(response.data);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };

    fetchAlunos();
  }, []);

  return (
    <div>
      <h1>Painel do Administrador</h1>
      <AlunoList alunos={alunos} />
    </div>
  );
};

export default AdminDashboard;
