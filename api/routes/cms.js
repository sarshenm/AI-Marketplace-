const express = require('express');
const prisma = require('../../lib/prisma');
const { authenticate, requireRole } = require('../../services/auth');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const pages = await prisma.cMSPage.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: pages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.post('/', authenticate, requireRole('admin'), async (req, res) => {
  const { slug, title, content } = req.body;
  if (!slug || !title) {
    return res.status(400).json({ success: false, error: 'slug and title required' });
  }
  try {
    const page = await prisma.cMSPage.create({ data: { slug, title, content } });
    res.json({ success: true, data: page });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.put('/:id', authenticate, requireRole('admin'), async (req, res) => {
  const { id } = req.params;
  const { slug, title, content } = req.body;
  try {
    const page = await prisma.cMSPage.update({ where: { id }, data: { slug, title, content } });
    res.json({ success: true, data: page });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.delete('/:id', authenticate, requireRole('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cMSPage.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
