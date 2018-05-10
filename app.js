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
// Date adjustment constants
const MILLI = 1000;
const SECONDS = 60 * MILLI;
const MINUTES = 60 * SECONDS;
const HOURS = 24 * MINUTES;

/* app starting point */
app.use(logger("dev"));
app.use(jsonParser());

// handle routes
app.use("/rest", routes);

// determine type of request and call appropriate middleware
app.use((req, res, next) => {
  if (req.type === "get") {
    // return the data as a response
    res.json(createData(req.options));
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
const createData = options => {

    // convert seed to integer if it exists, otherwise set to default seed
    options.seed = parseInt(options.seed) || 7654321;

    // Create data object and initialize to an empty object
    let data = {};

    // set unit type to caller options or set default value
    let unit = options.unit || "day";

    // select data based on whether caller wants hours, days, months or years.
    switch (unit) {
      case "day":
        data = createDays(options);
        break;
      
      case "hour":
        data = createHours(options);
        break;

      case "month":
        data = createMonths(options);
        break;
    
      default:
        break;
    }
  return data;

};



/* Create a collection of months */
const createMonths = options => {
  const data = {};
  // set number of months to create
  let count = parseInt(options.count) || 12; // default number of months
  for (let i = 0; i < count; i++) {
    data["month" + i] = createMonth(options.seed, i);
  }
  return data;
};

/* Create a collection of days */
const createDays = options => {
  const data = {};
  // set the number of days to create
  let count = parseInt(options.count) || 30; // default number of days
  for (let i = 0; i < count; i++) {
      data["day" + i] = createDay(options.seed, i);
  } 
  return data;
};

/* Create a collection of hours */
const createHours = options => {
  const data = {};

  // set number of hours to create
  let count = parseInt(options.count) || 24; // default number of hours
  for (let i = 0; i < count; i++) {
    data["hour" + i] = createHour(options.seed, i);
  } 
  return data;  
};

/* Create one months worth of data */
const createMonth = (seed, index = 1) => {
  let tablet = 0;
  let desktop = 0;
  let mobile = 0;
  
  let date = new Date();
  let currentDayOfMonth = date.getDate();

  let count = 30;

  // set day count based on number of days in the month
  if(index == 0) {
    count = currentDayOfMonth;
  }

  

  for (let i = 0; i < count; i++) {
    day = createDay(seed, (index * count) + i, false);
    tablet  += day.traffic.tablet;
    desktop += day.traffic.desktop;
    mobile  += day.traffic.mobile;
  }

  const month = {
    traffic : {
      tablet,
      desktop,
      mobile
    },
    date: new Date()
  };

  return month;
};

/* Create one days worth of data */
const createDay = (seed, index = 1) => {
  let tablet = 0;
  let desktop = 0;
  let mobile = 0;
  // loop through a 24 hour period adding data
  for (let i = 0; i < 24; i++) {
    // add an hours worth of data
    hour = createHour(seed, (index * 24) + i);
    tablet  += hour.traffic.tablet;
    desktop += hour.traffic.desktop;
    mobile  += hour.traffic.mobile;
  }
  const day = {
    traffic : {
      tablet,
      desktop,
      mobile 
    },
    date: new Date(Date.now() - (index * HOURS))
  };
  return day;
};

/* Create one hours worth of data */
const createHour = (seed, index = 1) => {
  const hour = {
    traffic: {
      tablet : parseInt(randomWithSeed(seed, index, 10, 0)),
      desktop: parseInt(randomWithSeed(seed * 30, index, 12, 0)),
      mobile : parseInt(randomWithSeed(seed * 20, index, 8, 0))
    },
    date : new Date(Date.now() - (index * MINUTES))
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