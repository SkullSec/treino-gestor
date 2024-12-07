// backend/routes/treinoRoutes.js
const express = require('express');
const Treino = require('../models/Treino');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Criar um novo treino para um aluno específico
router.post('/aluno/:alunoId', authMiddleware, async (req, res) => {
  if (!req.isAdmin) return res.status(403).json({ message: 'Acesso não autorizado' });
  const { alunoId } = req.params;
  const { exercicios } = req.body;

  try {
    const novoTreino = new Treino({ alunoId, exercicios });
    await novoTreino.save();
    res.status(201).json({ message: 'Treino criado com sucesso', treino: novoTreino });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar treino', error });
  }
});

// Listar todos os treinos de um aluno
router.get('/aluno/:alunoId', authMiddleware, async (req, res) => {
  const { alunoId } = req.params;

  try {
    const treinos = await Treino.find({ alunoId });
    res.json(treinos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar treinos', error });
  }
});

// Atualizar um treino específico
router.put('/:treinoId', authMiddleware, async (req, res) => {
  if (!req.isAdmin) return res.status(403).json({ message: 'Acesso não autorizado' });
  const { treinoId } = req.params;
  const { exercicios } = req.body;

  try {
    const treinoAtualizado = await Treino.findByIdAndUpdate(treinoId, { exercicios }, { new: true });
    if (!treinoAtualizado) {
      return res.status(404).json({ message: 'Treino não encontrado' });
    }
    res.json({ message: 'Treino atualizado com sucesso', treino: treinoAtualizado });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar treino', error });
  }
});

// Excluir um treino específico
router.delete('/:treinoId', authMiddleware, async (req, res) => {
  if (!req.isAdmin) return res.status(403).json({ message: 'Acesso não autorizado' });
  const { treinoId } = req.params;

  try {
    const treinoExcluido = await Treino.findByIdAndDelete(treinoId);
    if (!treinoExcluido) {
      return res.status(404).json({ message: 'Treino não encontrado' });
    }
    res.json({ message: 'Treino excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir treino', error });
  }
});

module.exports = router;
