require('dotenv').config();

const config = {
  // Server
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: (process.env.NODE_ENV || 'development') === 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // CORS
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Firebase
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    databaseUrl: process.env.FIREBASE_DATABASE_URL,
    isConfigured: !!(
      process.env.FIREBASE_PROJECT_ID && 
      process.env.FIREBASE_PRIVATE_KEY && 
      process.env.FIREBASE_CLIENT_EMAIL
    )
  },

  // Email (Future use)
  email: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    adminEmail: process.env.ADMIN_EMAIL,
    isConfigured: !!(
      process.env.SMTP_HOST && 
      process.env.SMTP_USER && 
      process.env.SMTP_PASSWORD
    )
  }
};

// Validate required environment variables
const validateConfig = () => {
  const errors = [];

  if (!config.frontendUrl) {
    errors.push('FRONTEND_URL is required');
  }

  if (config.isProduction && !config.firebase.isConfigured) {
    errors.push('Firebase credentials are required for production');
  }

  if (errors.length > 0) {
    console.warn('⚠️  Configuration warnings:');
    errors.forEach(error => console.warn(`   - ${error}`));
  }

  return errors.length === 0;
};

// Log configuration on startup
const logConfig = () => {
  console.log('\n📋 Server Configuration:');
  console.log(`   Port: ${config.port}`);
  console.log(`   Environment: ${config.nodeEnv}`);
  console.log(`   Frontend URL: ${config.frontendUrl}`);
  console.log(`   Firebase: ${config.firebase.isConfigured ? '✅ Configured' : '⚠️  Not configured'}`);
  console.log(`   Email: ${config.email.isConfigured ? '✅ Configured' : '⚠️  Not configured'}\n`);
};

module.exports = {
  ...config,
  validateConfig,
  logConfig
};
