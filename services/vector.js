const prisma = require('../lib/prisma');

async function storeEmbedding(toolId, content, embedding) {
  return prisma.vectorEmbedding.create({
    data: { toolId, content, embedding }
  });
}

async function searchSimilar(embedding, limit = 5) {
  return prisma.$queryRaw`SELECT * FROM "VectorEmbedding" ORDER BY embedding <-> ${embedding} LIMIT ${limit}`;
}

module.exports = { storeEmbedding, searchSimilar };
