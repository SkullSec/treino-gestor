// src/components/FormTreino.js
import React, { useState } from 'react';
import api from '../services/api';

const FormTreino = ({ alunoId, onTreinoCriado }) => {
  const [exercicios, setExercicios] = useState([{ nome: '', repeticoes: '', series: '', carga: '', tipo: '' }]);

  const handleExercicioChange = (index, campo, valor) => {
    const novosExercicios = [...exercicios];
    novosExercicios[index][campo] = valor;
    setExercicios(novosExercicios);
  };

  const handleAdicionarExercicio = () => {
    setExercicios([...exercicios, { nome: '', repeticoes: '', series: '', carga: '', tipo: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/treinos/aluno/${alunoId}`, { exercicios });
      onTreinoCriado(response.data.treino);
    } catch (error) {
      console.error('Erro ao criar treino:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Novo Treino</h2>
      {exercicios.map((exercicio, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Nome do exercício"
            value={exercicio.nome}
            onChange={(e) => handleExercicioChange(index, 'nome', e.target.value)}
          />
          <input
            type="number"
            placeholder="Repetições"
            value={exercicio.repeticoes}
            onChange={(e) => handleExercicioChange(index, 'repeticoes', e.target.value)}
          />
          <input
            type="number"
            placeholder="Séries"
            value={exercicio.series}
            onChange={(e) => handleExercicioChange(index, 'series', e.target.value)}
          />
          <input
            type="number"
            placeholder="Carga"
            value={exercicio.carga}
            onChange={(e) => handleExercicioChange(index, 'carga', e.target.value)}
          />
          <select
            value={exercicio.tipo}
            onChange={(e) => handleExercicioChange(index, 'tipo', e.target.value)}
          >
            <option value="">Selecione o tipo</option>
            <option value="musculacao">Musculação</option>
            <option value="aerobico">Aeróbico</option>
          </select>
        </div>
      ))}
      <button type="button" onClick={handleAdicionarExercicio}>Adicionar Exercício</button>
      <button type="submit">Salvar Treino</button>
    </form>
  );
};

export default FormTreino;
