import express from 'express';
const router = express.Router();
import { searchProducts } from '../services/searchService.js';
import QuestionService from '../services/questionService.js';
import GameEngineService from '../services/gameEngineService.js';
import LmsAdapterService from '../services/lmsAdapterService.js';
import { 
  validateRequest, 
  requireAuth, 
  requireRole 
} from '../middleware/security.js';
import { searchSchemas } from '../middleware/security.js';

// ========================================
// SEARCH ROUTES WITH SECURITY
// ========================================

// Public search endpoint with validation
router.get('/', 
  validateRequest(searchSchemas.query, 'query'),
  async (req, res) => {
    try {
      const { q, type, category, min_price, max_price, sort, page, limit } = req.query;
      
      const products = await searchProducts({
        query: q,
        type,
        category,
        min_price: min_price ? parseFloat(min_price) : undefined,
        max_price: max_price ? parseFloat(max_price) : undefined,
        sort,
        page: parseInt(page),
        limit: parseInt(limit)
      });

      res.json({
        message: 'Search completed successfully',
        data: products,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: products.length
        }
      });
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ 
        error: 'Search failed',
        message: 'Error searching products' 
      });
    }
  }
);

// ========================================
// PRODUCT MANAGEMENT ROUTES (AUTHENTICATED)
// ========================================

// Add questions to product (teachers only)
router.post('/products/:id/questions', 
  requireAuth,
  requireRole(['teacher', 'admin']),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const questionData = req.body;
      
      // Validate question data
      if (!questionData.question || !questionData.answer) {
        return res.status(400).json({
          error: 'Invalid question data',
          message: 'Question and answer are required'
        });
      }

      const question = await QuestionService.addQuestionToProduct(
        productId,
        questionData
      );

      res.status(201).json({
        message: 'Question added successfully',
        data: question
      });
    } catch (error) {
      console.error('Error adding question:', error);
      res.status(400).json({ 
        error: 'Question creation failed',
        message: error.message 
      });
    }
  }
);

// Start game session (authenticated users)
router.post('/products/:id/start-game', 
  requireAuth,
  async (req, res) => {
    try {
      const productId = req.params.id;
      const userId = req.user.id;
      const settings = req.body.settings || {};

      // Validate game settings
      if (settings.maxPlayers && (settings.maxPlayers < 2 || settings.maxPlayers > 50)) {
        return res.status(400).json({
          error: 'Invalid game settings',
          message: 'Max players must be between 2 and 50'
        });
      }

      const gameSession = await GameEngineService.createGameSession(
        productId,
        userId,
        settings
      );

      res.status(201).json({
        message: 'Game session created successfully',
        data: gameSession
      });
    } catch (error) {
      console.error('Error starting game:', error);
      res.status(400).json({ 
        error: 'Game creation failed',
        message: error.message 
      });
    }
  }
);

// Assign to LMS (teachers only)
router.post('/products/:id/assign-lms', 
  requireAuth,
  requireRole(['teacher', 'admin']),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const { integrationId, assignmentData } = req.body;

      // Validate assignment data
      if (!integrationId || !assignmentData) {
        return res.status(400).json({
          error: 'Missing assignment data',
          message: 'Integration ID and assignment data are required'
        });
      }

      const result = await LmsAdapterService.createAssignment(
        integrationId,
        {
          productId,
          ...assignmentData
        }
      );

      res.status(201).json({
        message: 'LMS assignment created successfully',
        data: result
      });
    } catch (error) {
      console.error('Error creating LMS assignment:', error);
      res.status(400).json({ 
        error: 'LMS assignment failed',
        message: error.message 
      });
    }
  }
);

// ========================================
// GAME SESSION MANAGEMENT
// ========================================

// Get active game sessions for a product
router.get('/products/:id/game-sessions', 
  requireAuth,
  async (req, res) => {
    try {
      const productId = req.params.id;
      const userId = req.user.id;

      const gameSessions = await GameEngineService.getActiveGameSessions(
        productId,
        userId
      );

      res.json({
        message: 'Game sessions retrieved successfully',
        data: gameSessions
      });
    } catch (error) {
      console.error('Error getting game sessions:', error);
      res.status(500).json({
        error: 'Failed to retrieve game sessions',
        message: error.message
      });
    }
  }
);

// Join game session
router.post('/game-sessions/:sessionId/join', 
  requireAuth,
  async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const userId = req.user.id;
      const { joinCode } = req.body;

      if (!joinCode) {
        return res.status(400).json({
          error: 'Missing join code',
          message: 'Join code is required to join a game session'
        });
      }

      const result = await GameEngineService.joinGameSession(
        sessionId,
        userId,
        joinCode
      );

      res.json({
        message: 'Successfully joined game session',
        data: result
      });
    } catch (error) {
      console.error('Error joining game session:', error);
      res.status(400).json({
        error: 'Failed to join game session',
        message: error.message
      });
    }
  }
);

// ========================================
// LMS INTEGRATION ROUTES
// ========================================

// Get user's LMS integrations
router.get('/lms-integrations', 
  requireAuth,
  async (req, res) => {
    try {
      const userId = req.user.id;
      
      const integrations = await LmsAdapterService.getUserIntegrations(userId);

      res.json({
        message: 'LMS integrations retrieved successfully',
        data: integrations
      });
    } catch (error) {
      console.error('Error getting LMS integrations:', error);
      res.status(500).json({
        error: 'Failed to retrieve LMS integrations',
        message: error.message
      });
    }
  }
);

// Create new LMS integration
router.post('/lms-integrations', 
  requireAuth,
  requireRole(['teacher', 'admin']),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { provider, accessToken, refreshToken } = req.body;

      // Validate integration data
      if (!provider || !accessToken) {
        return res.status(400).json({
          error: 'Missing integration data',
          message: 'Provider and access token are required'
        });
      }

      const integration = await LmsAdapterService.createIntegration(
        userId,
        provider,
        accessToken,
        refreshToken
      );

      res.status(201).json({
        message: 'LMS integration created successfully',
        data: integration
      });
    } catch (error) {
      console.error('Error creating LMS integration:', error);
      res.status(400).json({
        error: 'Failed to create LMS integration',
        message: error.message
      });
    }
  }
);

export default router;