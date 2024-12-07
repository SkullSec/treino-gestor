// backend/models/Aluno.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const alunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  treinos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Treino' }]
});

// Middleware para criptografar a senha antes de salvar o aluno no banco
alunoSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

module.exports = mongoose.model('Aluno', alunoSchema);
