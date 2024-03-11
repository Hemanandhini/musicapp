// protectedRoute.js
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/protected', (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) return res.status(401).send('Unauthorized');
    // Authorized, handle the request
    res.send('This is a protected route');
  });
});

module.exports = router;
