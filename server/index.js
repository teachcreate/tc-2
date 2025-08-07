const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const searchRoute = require('./routes/search');
const authRoute = require('./routes/auth');

app.use('/api/search', searchRoute);
app.use('/api/auth', authRoute);

app.get('/api', (req, res) => {
  res.send('TeachCreate Server is running!');
});

// For Vercel serverless functions
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}

module.exports = app;