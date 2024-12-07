// backend/models/Treino.js
const mongoose = require('mongoose');

const treinoSchema = new mongoose.Schema({
  alunoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true },
  exercicios: [
    {
      nome: { type: String, required: true },
      repeticoes: { type: String, required: true },
      series: { type: Number, required: true },
      carga: { type: Number, required: false },
      tipo: { type: String, enum: ['musculacao', 'aerobico'], required: true }
    }
  ],
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Treino', treinoSchema);

