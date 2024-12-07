// src/pages/GerenciarTreinos.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TreinoCard from '../components/TreinoCard';
import FormTreino from '../components/FormTreino';

const GerenciarTreinos = ({ alunoId }) => {
  const [treinos, setTreinos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const fetchTreinos = async () => {
      try {
        const response = await api.get(`/treinos/aluno/${alunoId}`);
        setTreinos(response.data);
      } catch (error) {
        console.error('Erro ao buscar treinos:', error);
      }
    };

    fetchTreinos();
  }, [alunoId]);

  const handleNovoTreino = () => {
    setMostrarFormulario(true);
  };

  const handleTreinoCriado = (novoTreino) => {
    setTreinos([...treinos, novoTreino]);
    setMostrarFormulario(false);
  };

  return (
    <div>
      <h1>Gerenciar Treinos</h1>
      <button onClick={handleNovoTreino}>Novo Treino</button>
      {mostrarFormulario && <FormTreino alunoId={alunoId} onTreinoCriado={handleTreinoCriado} />}
      <div>
        {treinos.map((treino) => (
          <TreinoCard key={treino._id} treino={treino} />
        ))}
      </div>
    </div>
  );
};

export default GerenciarTreinos;
