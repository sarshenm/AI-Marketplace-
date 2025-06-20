const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('../../lib/prisma');

const SECRET = process.env.JWT_SECRET || 'secret';

function getUser(req) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  const token = auth.split(' ')[1];
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const user = getUser(req);
    const where = {};
    if (req.query.mine && user) {
      where.userId = user.userId;
    } else if (!req.query.status) {
      where.status = 'approved';
    }
    if (req.query.status) {
      where.status = req.query.status;
    }
    const tools = await prisma.toolListing.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(tools);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
