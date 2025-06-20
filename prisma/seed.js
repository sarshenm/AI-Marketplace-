const prisma = require('../lib/prisma');
const { embedText } = require('../services/openai');
const { storeEmbedding } = require('../services/vector');

async function main() {
  const sampleTools = [
    { title: 'AI Logo Generator', description: 'Generate logos using AI.' },
    { title: 'Content Summarizer', description: 'Summarize long articles quickly.' }
  ];

  for (const tool of sampleTools) {
    const listing = await prisma.toolListing.create({
      data: { userId: 'seed-user', title: tool.title, description: tool.description }
    });
    const embedding = await embedText(`${tool.title}\n${tool.description}`);
    await storeEmbedding(listing.id, `${tool.title}\n${tool.description}`, embedding);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
