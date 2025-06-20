const prisma = require('../lib/prisma');
const { sql } = require('@prisma/client');

async function storeEmbedding(toolId, content, embedding) {
  return prisma.vectorEmbedding.create({
    data: { toolId, content, embedding }
  });
}

async function searchSimilar(embedding, limit = 5) {
  return prisma.$queryRaw(
    sql`SELECT t.*, ve.content FROM "VectorEmbedding" ve JOIN "ToolListing" t ON t.id = ve."toolId" WHERE t.status = 'approved' ORDER BY ve.embedding <-> ${embedding} LIMIT ${limit}`
  );
}

module.exports = { storeEmbedding, searchSimilar };
