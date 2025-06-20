const express = require('express');
const prisma = require('../../lib/prisma');
const { generateToolData } = require('../../services/openai');

const router = express.Router();

router.post('/', async (req, res) => {
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
    const user = await prisma.user.create({ data: { email, password, role: 'freelancer' } });
    res.json({ success: true, data: { id: user.id, profileInfo } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
