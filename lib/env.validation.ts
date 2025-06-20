const required = [
  'DATABASE_URL',
  'PGVECTOR_URL',
  'OPENAI_API_KEY',
  'PORT',
  'JWT_SECRET'
];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing environment variable ${key}`);
    process.exit(1);
  }
}

export {};
