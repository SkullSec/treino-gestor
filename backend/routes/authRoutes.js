// backend/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Aluno = require('../models/Aluno');

const router = express.Router();

// Rota para login do aluno
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se o aluno existe no banco
    const aluno = await Aluno.findOne({ email });
    if (!aluno) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Verifica se a senha está correta
    const senhaValida = await bcrypt.compare(senha, aluno.senha);
    if (!senhaValida) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: aluno._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login', error });
  }
});

module.exports = router;
