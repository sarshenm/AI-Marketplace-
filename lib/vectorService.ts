import prisma from './prisma';

export async function storeEmbedding(toolId: string, content: string, embedding: number[]) {
  return prisma.vectorEmbedding.create({
    data: { toolId, content, embedding }
  });
}

export async function searchSimilar(embedding: number[], limit = 5) {
  return prisma.$queryRaw`SELECT * FROM "VectorEmbedding" ORDER BY embedding <-> ${embedding} LIMIT ${limit}`;
}
