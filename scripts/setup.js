const { execSync } = require('child_process');

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

try {
  run('npm install');
} catch (err) {
  console.error('npm install failed. Check your network or proxy settings.');
  process.exit(1);
}

try {
  run('npx prisma migrate deploy');
  run('npx ts-node scripts/seed.ts');
  console.log('Setup completed.');
} catch (err) {
  console.error('Setup failed:', err);
  process.exit(1);
}
