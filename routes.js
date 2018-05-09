/* jshint esversion: 6 */
/* Middleware for handling REST routes */

const express = require('express');
const router = express.Router();

// GET /rest
router.get('/', (req, res, next) => {
  // create an object to send response in
  const options = {};

  // cycle through query parameters to know how to format response
  // req.query.queryKey ie: req.query.color
  for (let param in req.query) {
    options[param] = req.query[param];
  }

  // return response object
  req.options = options;
  req.type = "get";
  next();
});

module.exports = router;