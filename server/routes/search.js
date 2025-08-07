const express = require('express');
const router = express.Router();
const { searchProducts } = require('../services/searchService');

router.get('/', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).send({ message: 'Search query is required' });
  }

  try {
    const products = await searchProducts(query);
    res.send(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).send({ message: 'Error searching products' });
  }
});

module.exports = router;