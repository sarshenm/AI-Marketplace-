const express = require('express');
const prisma = require('../../lib/prisma');

const router = express.Router();

router.post('/', async (req, res) => {
  const { toolId } = req.body;
  if (!toolId) {
    return res.status(400).json({ success: false, error: 'toolId required' });
  }
  try {
    const listing = await prisma.toolListing.update({
      where: { id: toolId },
      data: { approved: true }
    });
    res.json({ success: true, data: listing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
