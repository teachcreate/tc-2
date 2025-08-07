const express = require('express');
const router = express.Router();
const { signupUser, signinUser } = require('../services/authService');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  try {
    const { data, error } = await signupUser(email, password);

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    return res.status(201).send({ data });
  } catch (error) {
    console.error('Error signing up user:', error);
    return res.status(500).send({ message: 'Error signing up user' });
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  try {
    const { data, error } = await signinUser(email, password);

    if (error) {
      return res.status(400).send({ message: error.message });
    }

    return res.send({ data });
  } catch (error) {
    console.error('Error signing in user:', error);
    return res.status(500).send({ message: 'Error signing in user' });
  }
});

module.exports = router;