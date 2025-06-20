const express = require('express');
const prisma = require('../../lib/prisma');
const { generateToolData, embedText } = require('../../services/openai');
const { storeEmbedding } = require('../../services/vector');

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, prompt } = req.body;
  if (!userId || !prompt) {
    return res.status(400).json({ success: false, error: 'userId and prompt required' });
  }
  try {
    let attempts = 0;
    let title, description;
    let aiContent = '';
    while (attempts < 2) {
      aiContent = await generateToolData(attempts === 0 ? prompt : `Please provide clear JSON {"title","description"} for: ${prompt}`);
      try {
        ({ title, description } = JSON.parse(aiContent));
      } catch (e) {
        attempts++;
        continue;
      }
      if (title && description && description.length > 10) {
        break;
      }
      attempts++;
    }
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
