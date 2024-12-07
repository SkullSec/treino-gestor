// backend/routes/alunoRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const Aluno = require('../models/Aluno');

const router = express.Router();

// Rota para cadastrar um novo aluno
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  
  try {
    // Verifica se o email já está em uso
    const alunoExistente = await Aluno.findOne({ email });
    if (alunoExistente) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Cria um novo aluno
    const novoAluno = new Aluno({ nome, email, senha });
    await novoAluno.save();
    res.status(201).json({ message: 'Aluno cadastrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar aluno', error });
  }
});

module.exports = router;
