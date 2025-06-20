const express = require('express');
const { generateToolData, embedText } = require('../../services/openai');
const { searchSimilar } = require('../../services/vector');

const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ success: false, error: 'prompt required' });
  }
  try {
    const embedding = await embedText(prompt);
    let results = await searchSimilar(embedding);
    if (!results || results.length === 0) {
      const fallback = await generateToolData(`Suggest categories for: ${prompt}`);
      return res.json({ success: true, data: { suggestions: fallback } });
    }
    res.json({ success: true, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
