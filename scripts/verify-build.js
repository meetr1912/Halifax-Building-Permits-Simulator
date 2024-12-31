const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'out');

function verifyBuild() {
  console.log('Verifying build output...');

  // Check if out directory exists
  if (!fs.existsSync(outDir)) {
    throw new Error('Build directory "out" does not exist');
  }

  // Check for essential files
  const requiredFiles = [
    'index.html',
    '_next/static',
    '.nojekyll'
  ];

  for (const file of requiredFiles) {
    const filePath = path.join(outDir, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Required file/directory "${file}" is missing`);
    }
  }

  // Check if index.html contains content
  const indexContent = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
  if (!indexContent.includes('Halifax Permit Finder')) {
    throw new Error('index.html does not contain expected content');
  }

  console.log('Build verification passed!');
  return true;
}

try {
  verifyBuild();
  process.exit(0);
} catch (error) {
  console.error('Build verification failed:', error.message);
  process.exit(1);
} 