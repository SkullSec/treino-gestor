// src/components/AlunoList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlunoList = ({ alunos }) => {
  const navigate = useNavigate();

  const handleGerenciarTreinos = (alunoId) => {
    navigate(`/admin/aluno/${alunoId}/treinos`);
  };

  return (
    <div>
      <h2>Alunos</h2>
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno._id}>
            <span>{aluno.nome} - {aluno.email}</span>
            <button onClick={() => handleGerenciarTreinos(aluno._id)}>Gerenciar Treinos</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlunoList;
