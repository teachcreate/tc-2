import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Import security middleware
import { 
  apiLimiter, 
  authLimiter, 
  searchLimiter,
  corsOptions,
  securityHeaders,
  sanitizeInput,
  securityLogger
} from './middleware/security.js';

const app = express();
const port = process.env.PORT || 5000;

// ========================================
// SECURITY MIDDLEWARE (ORDER MATTERS!)
// ========================================

// 1. Security headers first
app.use(securityHeaders);

// 2. CORS configuration
app.use(cors(corsOptions));

// 3. Body parsing
app.use(express.json({ limit: '10mb' })); // Prevent large payload attacks
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. Input sanitization
app.use(sanitizeInput);

// 5. Security logging
app.use(securityLogger);

// 6. Rate limiting (apply to all routes by default)
app.use('/api', apiLimiter);

// ========================================
// ROUTE-SPECIFIC RATE LIMITING
// ========================================

// Import routes
import searchRoute from './routes/search.js';
import authRoute from './routes/auth.js';

// Apply stricter rate limiting to auth routes
app.use('/api/auth', authLimiter);

// Apply search-specific rate limiting
app.use('/api/search', searchLimiter);

// Apply general rate limiting to other API routes
app.use('/api/search', apiLimiter);
app.use('/api/auth', apiLimiter);

// ========================================
// ROUTES
// ========================================

app.use('/api/search', searchRoute);
app.use('/api/auth', authRoute);

// Health check endpoint (no rate limiting)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Main API endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'TeachCreate Server is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// ========================================
// ERROR HANDLING MIDDLEWARE
// ========================================

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  // Don't leak error details in production
  const isProduction = process.env.NODE_ENV === 'production';
  
  res.status(error.status || 500).json({
    error: 'Internal Server Error',
    message: isProduction ? 'Something went wrong' : error.message,
    ...(isProduction ? {} : { stack: error.stack })
  });
});

// ========================================
// SERVER STARTUP
// ========================================

// For Vercel serverless functions
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`🚀 TeachCreate Server is running on port: ${port}`);
    console.log(`🔒 Security middleware enabled`);
    console.log(`📊 Rate limiting active`);
    console.log(`🛡️ Security headers configured`);
  });
}

export default app;