import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Simple health check endpoint
app.get('/api', (req, res) => {
  res.send('TeachCreate Server is running!');
});

// Mock endpoints for development
app.get('/api/search', (req, res) => {
  res.json({ message: 'Search endpoint - Supabase integration pending' });
});

app.get('/api/auth', (req, res) => {
  res.json({ message: 'Auth endpoint - Supabase integration pending' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log(`Health check: http://localhost:${port}/api`);
});

export default app;

