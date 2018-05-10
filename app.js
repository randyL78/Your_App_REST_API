/* jshint esversion: 6 */
/*
 * Main app for Rest API
 * @author Randy Layne
 * @version 1.0.0
 */

// Import express, app start point
const express = require('express');
const app = express();

/* Project dependencies middleware */
// used to create json returns and recieves
const jsonParser = require("body-parser").json;

// used for console logs (mostly for color to help debugging)
const logger = require("morgan");

/* Custom middleware imports */
const routes = require("./routes");
const traffic = require("./traffic");

/* app starting point */
app.use(logger("dev"));
app.use(jsonParser());


// handle routes
app.use("/rest", routes);

// create the traffic data
app.use(traffic);



// if it gets this far route was not found, catch 404 and forward to handler
app.use(function(req, res, next) {
  var err = new Error("Route not found");
  err.status = 404;
  next(err);
});

// main error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});


   

/* create a server to run app */
const port = process.env.port || 3030;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});