#!/usr/bin/env node

/**
 * Quick Setup Script for Stratiq Digital
 * Run: node setup.js
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

const log = {
  success: (msg) => console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`),
  info: (msg) => console.log(`${COLORS.blue}ℹ${COLORS.reset} ${msg}`),
  warn: (msg) => console.log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`),
  error: (msg) => console.log(`${COLORS.red}✗${COLORS.reset} ${msg}`),
};

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    log.success(`${description} found`);
    return true;
  } else {
    log.error(`${description} missing`);
    return false;
  }
}

function checkDirectory(dirPath, description) {
  if (fs.existsSync(dirPath)) {
    log.success(`${description} directory found`);
    return true;
  } else {
    log.error(`${description} directory missing`);
    return false;
  }
}

console.log(`\n${COLORS.blue}╔════════════════════════════════════════╗${COLORS.reset}`);
console.log(`${COLORS.blue}║   Stratiq Digital - Setup Verification  ║${COLORS.reset}`);
console.log(`${COLORS.blue}╚════════════════════════════════════════╝${COLORS.reset}\n`);

let allGood = true;

// Check Frontend
console.log(`${COLORS.blue}Frontend (Next.js):${COLORS.reset}`);
allGood &= checkDirectory('./my-app', 'Frontend');
allGood &= checkFile('./my-app/package.json', 'Frontend package.json');
allGood &= checkFile('./my-app/.env.example', 'Frontend .env.example');

console.log();

// Check Backend
console.log(`${COLORS.blue}Backend (Node.js):${COLORS.reset}`);
allGood &= checkDirectory('./backend', 'Backend');
allGood &= checkFile('./backend/package.json', 'Backend package.json');
allGood &= checkFile('./backend/server.js', 'Backend server.js');
allGood &= checkFile('./backend/.env.example', 'Backend .env.example');
allGood &= checkFile('./backend/firebase-config.js', 'Backend firebase-config.js');
allGood &= checkFile('./backend/config.js', 'Backend config.js');
allGood &= checkDirectory('./backend/routes', 'Backend routes');
allGood &= checkDirectory('./backend/controllers', 'Backend controllers');
allGood &= checkDirectory('./backend/middleware', 'Backend middleware');

console.log();

// Check Documentation
console.log(`${COLORS.blue}Documentation:${COLORS.reset}`);
allGood &= checkFile('./SETUP.md', 'Setup guide');
allGood &= checkFile('./backend/README.md', 'Backend README');

console.log(`\n${COLORS.blue}Next Steps:${COLORS.reset}\n`);

console.log('1. Frontend setup:');
console.log('   cd my-app');
console.log('   npm install');
console.log('   cp .env.example .env.local');
console.log('   npm run dev\n');

console.log('2. Backend setup (in another terminal):');
console.log('   cd backend');
console.log('   npm install');
console.log('   cp .env.example .env');
console.log('   npm run dev\n');

console.log(`3. Frontend will be available at: ${COLORS.green}http://localhost:3000${COLORS.reset}`);
console.log(`4. Backend will be available at: ${COLORS.green}http://localhost:5000${COLORS.reset}`);
console.log(`5. Test form with: POST ${COLORS.green}http://localhost:5000/api/quotes${COLORS.reset}\n`);

if (allGood) {
  log.success('All files and directories are in place!');
} else {
  log.warn('Some files or directories are missing. Check the messages above.');
}

console.log();
