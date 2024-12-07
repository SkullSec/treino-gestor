// src/pages/AlunoDashboard.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TreinoCard from '../components/TreinoCard';

const AlunoDashboard = () => {
  const [treinos, setTreinos] = useState([]);

  useEffect(() => {
    const fetchTreinos = async () => {
      try {
        const response = await api.get('/treinos/me'); // Rota para buscar treinos do aluno autenticado
        setTreinos(response.data);
      } catch (error) {
        console.error('Erro ao buscar treinos:', error);
      }
    };

    fetchTreinos();
  }, []);

  return (
    <div>
      <h1>Meus Treinos</h1>
      <div>
        {treinos.map((treino) => (
          <TreinoCard key={treino._id} treino={treino} />
        ))}
      </div>
    </div>
  );
};

export default AlunoDashboard;
