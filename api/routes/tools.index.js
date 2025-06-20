const express = require('express');
const prisma = require('../../lib/prisma');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const tools = await prisma.toolListing.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tools);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
