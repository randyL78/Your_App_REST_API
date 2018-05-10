/* jshint esversion: 6 */
/* Middleware for error handling */

const errors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
};

module.exports = errors;
