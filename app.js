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
// route handling
const routes = require("./routes");

/* other global variables */
const MILLI = 1000;
const SECONDS = 60;
const MINUTES = 60;
const HOURS = 24;

/* app starting point */
app.use(logger("dev"));
app.use(jsonParser());

// handle routes
app.use("/rest", routes);

// determine type of request and call appropriate middleware
app.use((req, res, next) => {
  if (req.type === "get") {
    res.json(createData(req.options.seed));
  } else {
    next();
  }
});

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


/* Create object with data */
const createData = seed => {
  // create a date object for now, and adjust object dates fromt there
  const date = new Date();

  // convert seed to integer if it exists, otherwise set to default seed
  seed = parseInt(seed) || 7654321;
  // store generated data in an object
  const data = {};

  // loop through number of cycles to create data
  for (let i = 0; i < 365; i++) {
    data["day" + i] = createDay(seed, i, true);
  }
 
  return data;

};

/* Create one days worth of data */
const createDay = (seed, index, needsDate = true) => {
  let tablet = 0;
  let desktop = 0;
  let mobile = 0;
  // loop through a 24 hour period adding data
  for (let i = 0; i < 24; i++) {
    // add an hours worth of data
    hour = createHour(seed, (index * 24) + i);
    tablet  += hour.tablet;
    desktop += hour.desktop;
    mobile  += hour.mobile;
  }
  const day = {
    tablet : tablet,
    desktop: desktop,
    mobile : mobile,
    date   : new Date(Date.now() - (index * 24 * 60 * 60 * 1000))
  };
  return day;
};

/* Create one hours worth of data */
const createHour = (seed, index) => {
  const hour = {
    tablet : parseInt(randomWithSeed(seed, index, 10, 0)),
    mobile : parseInt(randomWithSeed(seed * 2, index, 8, 0)),
    desktop: parseInt(randomWithSeed(seed * 3, index, 12, 0)),
    date   : new Date(Date.now() - (index * 60 * 60 * 1000))
  };
  return hour;
};

/* Create a psuedorandom number between 0 and 1 based on a seed */
const randomWithSeed = (seed, index = 1, max = 1, min = 0) => {
  seed = Math.sin(seed) * 10000;
  index = Math.sin(index) * 10000;
  seed = Math.sin(seed + index) * 10000;
  return ((seed - Math.floor(seed)) * (max - min) + min);
};

/* create a server to run app */
const port = process.env.port || 3030;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});