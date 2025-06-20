const express = require('express');
const prisma = require('../../lib/prisma');
const { generateToolData, embedText } = require('../../lib/openaiClient');
const { storeEmbedding } = require('../../lib/vectorService');

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, prompt } = req.body;
  if (!userId || !prompt) {
    return res.status(400).json({ success: false, error: 'userId and prompt required' });
  }
  try {
    const aiResponse = await generateToolData(prompt);
    const { title, description } = JSON.parse(aiResponse);
    if (!title || !description) {
      return res.status(400).json({ success: false, error: 'Invalid AI response' });
    }
    const listing = await prisma.toolListing.create({
      data: { userId, title, description }
    });
    const embedding = await embedText(`${title}\n${description}`);
    await storeEmbedding(listing.id, `${title}\n${description}`, embedding);
    res.json({ success: true, data: listing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
