/* jshint esversion: 6 */
/*
 * Main app for Rest API
 * @author Randy Layne
 * @version 1.0.0
 */

// Import express, app start point
const express = require('express');
const app = express();
const path = require('path');

/* Project dependencies middleware */
// handle CORS requirements
const cors = require('cors');

// used to create json returns and recieves
const jsonParser = require("body-parser").json;

// used for console logs (mostly for color to help debugging)
const logger = require("morgan");

/* Custom middleware imports */
const routes = require("./routes");
const traffic = require("./traffic");
const errors = require("./errors");

// testing out some stuff
app.use(express.static(path.join(__dirname, 'public')))

/* set view render engine to pug */
app.set('view engine', 'pug');

/* add CORS access */
app.use(cors());

/* app starting point */
app.use(logger("dev"));
app.use(jsonParser());

// handle routes
app.use("/rest", routes);

// create the traffic data
app.use(traffic);

// Display a home page for base route 
app.get('/', (req, res) => {
  res.render('index');
});

// if it gets this far route was not found, catch 404 and forward to handler
app.use(function(req, res, next) {
  var err = new Error("Route not found");
  err.status = 404;
  next(err);
});

// main error handler
app.use(errors);


/* create a server to run app */
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});