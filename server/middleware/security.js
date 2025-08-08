import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import Joi from 'joi';

// ========================================
// 1. RATE LIMITING
// ========================================

// General API rate limiting
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      error: 'Rate limit exceeded',
      message: 'Too many requests from this IP, please try again later.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Stricter rate limiting for auth endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.',
    retryAfter: '15 minutes'
  },
  skipSuccessfulRequests: true, // Don't count successful requests
  handler: (req, res) => {
    res.status(429).json({
      error: 'Authentication rate limit exceeded',
      message: 'Too many authentication attempts, please try again later.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Search rate limiting (prevent abuse)
export const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 searches per minute
  message: {
    error: 'Too many search requests, please slow down.',
    retryAfter: '1 minute'
  },
  handler: (req, res) => {
    res.status(429).json({
      error: 'Search rate limit exceeded',
      message: 'Too many search requests, please slow down.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// ========================================
// 2. CORS CONFIGURATION
// ========================================

const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  process.env.VERCEL_URL || 'https://your-app.vercel.app'
];

export const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin', 
    'X-Requested-With', 
    'Content-Type', 
    'Accept', 
    'Authorization',
    'X-API-Key'
  ],
  exposedHeaders: ['X-Total-Count', 'X-RateLimit-Reset'],
  maxAge: 86400 // 24 hours
};

// ========================================
// 3. SECURITY HEADERS
// ========================================

export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", process.env.SUPABASE_URL || "https://*.supabase.co"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
});

// ========================================
// 4. INPUT VALIDATION SCHEMAS
// ========================================

// User validation schemas
export const userSchemas = {
  signup: Joi.object({
    email: Joi.string().email().required().max(255),
    password: Joi.string().min(8).max(128).required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .message('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    display_name: Joi.string().min(1).max(100).optional()
  }),

  signin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  update: Joi.object({
    display_name: Joi.string().min(1).max(100).optional(),
    bio: Joi.string().max(500).optional(),
    avatar_url: Joi.string().uri().optional()
  })
};

// Product validation schemas
export const productSchemas = {
  create: Joi.object({
    title: Joi.string().min(1).max(255).required(),
    description: Joi.string().min(10).max(2000).required(),
    price: Joi.number().positive().precision(2).required(),
    type: Joi.string().valid('tool', 'game', 'resource').required(),
    thumbnail_url: Joi.string().uri().required(),
    demo_url: Joi.string().uri().optional(),
    is_published: Joi.boolean().default(false)
  }),

  update: Joi.object({
    title: Joi.string().min(1).max(255).optional(),
    description: Joi.string().min(10).max(2000).optional(),
    price: Joi.number().positive().precision(2).optional(),
    type: Joi.string().valid('tool', 'game', 'resource').optional(),
    thumbnail_url: Joi.string().uri().optional(),
    demo_url: Joi.string().uri().optional(),
    is_published: Joi.boolean().optional()
  })
};

// Review validation schemas
export const reviewSchemas = {
  create: Joi.object({
    product_id: Joi.string().uuid().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().max(1000).optional()
  }),

  update: Joi.object({
    rating: Joi.number().integer().min(1).max(5).optional(),
    comment: Joi.string().max(1000).optional()
  })
};

// Search validation schemas
export const searchSchemas = {
  query: Joi.object({
    q: Joi.string().min(1).max(100).required(),
    type: Joi.string().valid('tool', 'game', 'resource').optional(),
    category: Joi.string().uuid().optional(),
    min_price: Joi.number().min(0).optional(),
    max_price: Joi.number().min(0).optional(),
    sort: Joi.string().valid('relevance', 'price_low', 'price_high', 'newest', 'rating').default('relevance'),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(20)
  })
};

// ========================================
// 5. VALIDATION MIDDLEWARE
// ========================================

export const validateRequest = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({
        error: 'Validation failed',
        message: errorMessage,
        details: error.details
      });
    }

    // Replace validated data
    req[property] = value;
    next();
  };
};

// ========================================
// 6. SANITIZATION MIDDLEWARE
// ========================================

export const sanitizeInput = (req, res, next) => {
  // Sanitize body
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        // Remove potential XSS vectors
        req.body[key] = req.body[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '')
          .trim();
      }
    });
  }

  // Sanitize query parameters
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === 'string') {
        req.query[key] = req.query[key].trim();
      }
    });
  }

  next();
};

// ========================================
// 7. AUTHENTICATION MIDDLEWARE
// ========================================

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'Bearer token is required'
      });
    }

    const token = authHeader.substring(7);
    
    // Verify token with Supabase
    const { data: { user }, error } = await req.supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Token is invalid or expired'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      error: 'Authentication error',
      message: 'Internal server error during authentication'
    });
  }
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'User must be authenticated'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        message: 'User does not have required role'
      });
    }

    next();
  };
};

// ========================================
// 8. LOGGING MIDDLEWARE
// ========================================

export const securityLogger = (req, res, next) => {
  const startTime = Date.now();
  
  // Log request
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - IP: ${req.ip} - User-Agent: ${req.get('User-Agent')}`);
  
  // Log response
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - Status: ${res.statusCode} - Duration: ${duration}ms`);
    
    // Log security events
    if (res.statusCode === 401 || res.statusCode === 403) {
      console.warn(`[SECURITY] ${req.method} ${req.path} - Unauthorized/Forbidden access attempt from IP: ${req.ip}`);
    }
    
    if (res.statusCode === 429) {
      console.warn(`[SECURITY] ${req.method} ${req.path} - Rate limit exceeded from IP: ${req.ip}`);
    }
  });
  
  next();
};
