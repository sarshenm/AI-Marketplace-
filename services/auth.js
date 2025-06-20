const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

const SECRET = process.env.AUTH_SECRET || 'secret';

async function login(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) {
    return null;
  }
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

module.exports = { login, authenticate };
