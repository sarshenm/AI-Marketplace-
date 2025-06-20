const express = require('express');
const prisma = require('../../lib/prisma');
const { generateToolData } = require('../../services/openai');
const { login } = require('../../services/auth');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({ windowMs: 60 * 1000, max: 5 });

const router = express.Router();

router.post('/', limiter, async (req, res) => {
  const { email, password, prompt } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'email and password required' });
  }
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ success: false, error: 'email already registered' });
    }
    let profileInfo = null;
    if (prompt) {
      profileInfo = await generateToolData(prompt);
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed, role: 'freelancer' } });
    const token = await login(email, password);
    res.json({ success: true, data: { id: user.id, profileInfo, token } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
