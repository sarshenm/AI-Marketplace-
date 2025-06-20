import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateToolData(prompt: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are the FoundaBrain AI Wizard.' },
      { role: 'user', content: prompt }
    ]
  });
  return completion.choices[0]?.message?.content || '';
}

export async function embedText(text: string): Promise<number[]> {
  const resp = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text
  });
  return resp.data[0].embedding as unknown as number[];
}
