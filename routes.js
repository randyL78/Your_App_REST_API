/* jshint esversion: 6 */
/* Middleware for handling REST routes */

const express = require('express');
const router = express.Router();

// GET /rest
router.get('/', (req, res) => {
  // return all the questions
  res.json({response: "You sent me a GET request"});
});

module.exports = router;