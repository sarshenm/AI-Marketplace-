const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require('../lib/prisma');

const SECRET = process.env.JWT_SECRET || 'secret';

async function login(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
  return token;
}

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.split(' ')[1];
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

module.exports = { login, authenticate, requireRole };
