import prisma from '../lib/prisma';
import { embedText } from '../services/openai';
import { storeEmbedding } from '../services/vector';
import bcrypt from 'bcrypt';

async function main() {
  const passwordHash = await bcrypt.hash('password', 10);
  const user = await prisma.user.create({
    data: { email: 'freelancer@test.com', password: passwordHash, role: 'freelancer' }
  });

  const sampleTools = [
    {
      title: 'AI Logo Generator',
      description: 'Generate logos using AI.',
      tags: ['design', 'logo'],
      useCase: 'Branding assets',
      problemSolved: 'Creating custom logos',
      clientInput: 'Company name and style preferences',
      price: 49.99
    },
    {
      title: 'Content Summarizer',
      description: 'Summarize long articles quickly.',
      tags: ['nlp', 'summarization'],
      useCase: 'Article summarization',
      problemSolved: 'Reducing reading time',
      clientInput: 'Article URL or text',
      price: 29.99
    },
    {
      title: 'AI Code Reviewer',
      description: 'Automatically review pull requests for style and bugs.',
      tags: ['code', 'review', 'automation'],
      useCase: 'Code quality enforcement',
      problemSolved: 'Manual code review overhead',
      clientInput: 'GitHub repository URL',
      price: 99.0
    }
  ];

  for (const tool of sampleTools) {
    const listing = await prisma.toolListing.create({
      data: {
        userId: user.id,
        title: tool.title,
        description: tool.description,
        tags: tool.tags,
        useCase: tool.useCase,
        problemSolved: tool.problemSolved,
        clientInput: tool.clientInput,
        price: tool.price
      }
    });
    const embedding = await embedText(`${tool.title}\n${tool.description}`);
    await storeEmbedding(listing.id, `${tool.title}\n${tool.description}`, embedding);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());
