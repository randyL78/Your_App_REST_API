/* jshint esversion: 6 */
/* Middleware for handling REST routes */

const express = require('express');
const router = express.Router();

// GET /rest
router.get('/', (req, res) => {
  // create an object to send response in
  const response = {};

  // cycle through query parameters to know how to format response
  // req.query.queryKey ie: req.query.color
  for (let param in req.query) {
    response[param] = req.query[param];
  }


  // return response object
  res.json(response);
});

module.exports = router;