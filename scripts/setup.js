const { execSync } = require('child_process');

try {
  execSync('npm install', { stdio: 'inherit' });
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Setup completed.');
} catch (err) {
  console.error('Setup failed:', err);
  process.exit(1);
}
