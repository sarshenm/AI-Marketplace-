const express = require('express');
const { embedText } = require('../../services/openai');
const { searchSimilar } = require('../../services/vector');

const router = express.Router();

router.get('/', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ success: false, error: 'query required' });
  }
  try {
    const embedding = await embedText(query);
    const results = await searchSimilar(embedding);
    res.json({ success: true, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
