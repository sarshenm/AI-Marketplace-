const express = require('express');
const prisma = require('../../lib/prisma');
const { authenticate, requireRole } = require('../../services/auth');

const router = express.Router();

router.post('/', authenticate, requireRole('admin'), async (req, res) => {
  const { toolId, action, comment } = req.body;
  if (!toolId || !action) {
    return res.status(400).json({ success: false, error: 'toolId and action required' });
  }
  try {
    let status;
    switch (action) {
      case 'approve':
        status = 'approved';
        break;
      case 'reject':
        status = 'rejected';
        break;
      case 'flag':
        status = 'flagged';
        break;
      default:
        return res.status(400).json({ success: false, error: 'Invalid action' });
    }
    const listing = await prisma.toolListing.update({
      where: { id: toolId },
      data: { status, moderationComment: comment || null }
    });
    res.json({ success: true, data: listing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
