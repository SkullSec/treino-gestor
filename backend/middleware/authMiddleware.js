// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.alunoId = verified.id;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;
