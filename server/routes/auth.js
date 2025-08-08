import express from 'express';
const router = express.Router();
import { signupUser, signinUser } from '../services/authService.js';
import { 
  validateRequest, 
  requireAuth, 
  requireRole 
} from '../middleware/security.js';
import { userSchemas } from '../middleware/security.js';

// ========================================
// AUTHENTICATION ROUTES WITH SECURITY
// ========================================

// User signup with validation
router.post('/signup', 
  validateRequest(userSchemas.signup, 'body'),
  async (req, res) => {
    try {
      const { email, password, display_name } = req.body;
      
      const { data, error } = await signupUser(email, password, display_name);

      if (error) {
        return res.status(400).json({ 
          error: 'Signup failed',
          message: error.message 
        });
      }

      return res.status(201).json({ 
        message: 'User created successfully',
        data: {
          id: data.user.id,
          email: data.user.email,
          display_name: data.user.user_metadata?.display_name
        }
      });
    } catch (error) {
      console.error('Error signing up user:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        message: 'Error creating user account' 
      });
    }
  }
);

// User signin with validation
router.post('/signin', 
  validateRequest(userSchemas.signin, 'body'),
  async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const { data, error } = await signinUser(email, password);

      if (error) {
        return res.status(401).json({ 
          error: 'Authentication failed',
          message: error.message 
        });
      }

      return res.json({ 
        message: 'Authentication successful',
        data: {
          user: {
            id: data.user.id,
            email: data.user.email,
            display_name: data.user.user_metadata?.display_name
          },
          session: {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            expires_at: data.session.expires_at
          }
        }
      });
    } catch (error) {
      console.error('Error signing in user:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        message: 'Error during authentication' 
      });
    }
  }
);

// Get current user profile (requires authentication)
router.get('/profile', 
  requireAuth,
  async (req, res) => {
    try {
      // User is already authenticated via middleware
      const user = req.user;
      
      return res.json({
        message: 'Profile retrieved successfully',
        data: {
          id: user.id,
          email: user.email,
          display_name: user.user_metadata?.display_name,
          role: user.user_metadata?.role || 'student',
          created_at: user.created_at
        }
      });
    } catch (error) {
      console.error('Error getting user profile:', error);
      return res.status(500).json({
        error: 'Internal server error',
        message: 'Error retrieving user profile'
      });
    }
  }
);

// Update user profile (requires authentication)
router.put('/profile', 
  requireAuth,
  validateRequest(userSchemas.update, 'body'),
  async (req, res) => {
    try {
      const { display_name, bio, avatar_url } = req.body;
      const userId = req.user.id;
      
      // Update user metadata in Supabase
      const { data, error } = await req.supabase.auth.updateUser({
        data: {
          display_name,
          bio,
          avatar_url
        }
      });

      if (error) {
        return res.status(400).json({
          error: 'Update failed',
          message: error.message
        });
      }

      return res.json({
        message: 'Profile updated successfully',
        data: {
          id: data.user.id,
          email: data.user.email,
          display_name: data.user.user_metadata?.display_name,
          bio: data.user.user_metadata?.bio,
          avatar_url: data.user.user_metadata?.avatar_url
        }
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).json({
        error: 'Internal server error',
        message: 'Error updating user profile'
      });
    }
  }
);

// Refresh token endpoint
router.post('/refresh', async (req, res) => {
  try {
    const { refresh_token } = req.body;
    
    if (!refresh_token) {
      return res.status(400).json({
        error: 'Missing refresh token',
        message: 'Refresh token is required'
      });
    }

    const { data, error } = await req.supabase.auth.refreshSession({
      refresh_token
    });

    if (error) {
      return res.status(401).json({
        error: 'Token refresh failed',
        message: error.message
      });
    }

    return res.json({
      message: 'Token refreshed successfully',
      data: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at
      }
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Error refreshing authentication token'
    });
  }
});

// Sign out endpoint
router.post('/signout', 
  requireAuth,
  async (req, res) => {
    try {
      const { error } = await req.supabase.auth.signOut();
      
      if (error) {
        return res.status(400).json({
          error: 'Signout failed',
          message: error.message
        });
      }

      return res.json({
        message: 'User signed out successfully'
      });
    } catch (error) {
      console.error('Error signing out user:', error);
      return res.status(500).json({
        error: 'Internal server error',
        message: 'Error during sign out'
      });
    }
  }
);

// Admin-only endpoint to get all users
router.get('/users', 
  requireAuth,
  requireRole(['admin']),
  async (req, res) => {
    try {
      const { data: users, error } = await req.supabase
        .from('users')
        .select('id, email, role, display_name, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        return res.status(400).json({
          error: 'Failed to fetch users',
          message: error.message
        });
      }

      return res.json({
        message: 'Users retrieved successfully',
        data: users
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({
        error: 'Internal server error',
        message: 'Error retrieving users'
      });
    }
  }
);

export default router;