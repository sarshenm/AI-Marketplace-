const express = require('express');
const { generateToolData } = require('../../services/openai');

const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ success: false, error: 'prompt required' });
  }
  try {
    const content = await generateToolData(prompt);
    res.json({ success: true, data: content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
