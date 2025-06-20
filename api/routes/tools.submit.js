const express = require('express');
const prisma = require('../../lib/prisma');
const { generateToolData, embedText } = require('../../services/openai');
const { storeEmbedding } = require('../../services/vector');
const { authenticate, requireRole } = require('../../services/auth');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({ windowMs: 60 * 1000, max: 5 });

const router = express.Router();

router.post('/', limiter, authenticate, requireRole('freelancer'), async (req, res) => {
  const { prompt } = req.body;
  const userId = req.user.userId;
  if (!prompt) {
    return res.status(400).json({ success: false, error: 'prompt required' });
  }
  try {
    let attempts = 0;
    let parsed = {};
    let aiContent = '';
    const schema = '{"title","description","tags","useCase","problemSolved","clientInput","price"}';
    while (attempts < 2) {
      aiContent = await generateToolData(
        attempts === 0 ? prompt : `Please provide clear JSON ${schema} for: ${prompt}`
      );
      try {
        parsed = JSON.parse(aiContent);
      } catch (e) {
        parsed = {};
        attempts++;
        continue;
      }
      if (parsed.title && parsed.description) {
        break;
      }
      attempts++;
    }
    const { title, description, tags = [], useCase = '', problemSolved = '', clientInput = '', price = 0 } = parsed;
    if (!title || !description) {
      return res.status(422).json({ success: false, error: 'AI could not interpret your description. Try rephrasing your description.' });
    }
    if (description.length < 20) {
      return res.status(422).json({ success: false, error: 'AI response too short. Try rephrasing your description.' });
    }
    const listing = await prisma.toolListing.create({
      data: { userId, title, description, tags, useCase, problemSolved, clientInput, price }
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
