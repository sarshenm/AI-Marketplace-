const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateToolData(prompt) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'system', content: 'You are the FoundaBrain AI Wizard.' }, { role: 'user', content: prompt }]
  });
  return completion.choices[0]?.message?.content;
}

async function embedText(text) {
  const resp = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text
  });
  return resp.data[0].embedding;
}

module.exports = { generateToolData, embedText };
