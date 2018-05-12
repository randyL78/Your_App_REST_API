# Your App REST API

## This API is designed to provide data for the "Web App Dashboard" project from Treehouse

> This project does not claim to be an official addition to the project and was not created or condoned by Treehouse.

## How to use

## Basic usage with default parameters

> You can use AJAX to call the Graph Data REST API and will recieve by default 30 days worth of "daily" data. The default implementation is as follows:

### if you are using JQuery:

``` JavaScript

  $.ajax({
    url: 'https://graph-data-fewd.herokuapp.com/rest/',
    dataType: 'json',
    success: function(data) {
      /* the console.log just displays the data, in your app you will 
      want to pass that data to another method or assign it to a 
      variable outside of the ajax scope */
      console.log(data);
    }
  });

```

### if you are using ECMA 2015 syntax:

``` JavaScript

const url = 'https://graph-data-fewd.herokuapp.com/rest/';
const ajax = new XMLHttpRequest();	
// wait until data has been retrieved
ajax.onreadystatechange = () => {
  if(ajax.readyState === 4) {
    const data = JSON.parse(ajax.responseText);
    /* the console.log just displays the data, in your app you will want 
    to pass that data to another method or assign it to a variable 
    outside of the ajax scope */
    console.log(data)
  }
};
ajax.open('GET', url);
ajax.send();
  
```

### traditonal JavaScript syntax:

``` JavaScript

var url = 'https://graph-data-fewd.herokuapp.com/rest/';
var ajax = new XMLHttpRequest();	
// wait until data has been retrieved
ajax.onreadystatechange = (function () {
  if(ajax.readyState === 4) {
    var data = JSON.parse(ajax.responseText);
    /* the console.log just displays the data, in your app you will want 
    to pass that data to another method or assign it to a variable 
    outside of the ajax scope */
    console.log(data)
  }
});
ajax.open('GET', url);
ajax.send();

```

> This is the first couple entries of what the object you get back will look like with the defaults in:

``` Json

{
    "day0": {
        "traffic": {
            "tablet": 125,
            "desktop": 137,
            "mobile": 77
        },
        "date": "2018-05-11T22:12:25.836Z"
    },
    "day1": {
        "traffic": {
            "tablet": 118,
            "desktop": 95,
            "mobile": 89
        },
        "date": "2018-05-10T22:12:25.836Z"
    },
    "day2": {
        "traffic": {
            "tablet": 101,
            "desktop": 123,
            "mobile": 106
        },
        "date": "2018-05-09T22:12:25.836Z"
    },
    "day3": {
        "traffic": {
            "tablet": 116,
            "desktop": 149,
            "mobile": 98
        },
        "date": "2018-05-08T22:12:25.836Z"
    } 
    // more entries after this...

```
> NOTE: the first object in data starts with "now", and each one goes further back into the past. For instance `day3` would be 3 days ago.

## Setting options with your GET request

> There are three options you can set for what type of data you want to get back from your GET request. 
1 seed
2 unit
3 count

### Seed

 A seed allows you to get the same data back each time you make your GET request as oppossed to "random" data that would be different everytime you refreshed the browser. Without specifying a seed, the api defaults to `7654321`, but this can be changed by passing a seed parameter to the API on your GET request. We recommend a 7 digit seed, but you can assign it any integer value you would like. You can set the seed option as follows:

#### JQuery 

> For JQuery, you add in a `data` key and then give it a value of `seed=yourNumber`

``` JavaScript
  $.ajax({
    url: 'https://graph-data-fewd.herokuapp.com/rest/',
    data: 'seed=1234567', // replace 1234567 with any number you would like
    dataType: 'json',
    /* rest of code snippet from basic usage .... */

```

#### ECMA2015 and traditional JS

> For the other languages you create a string variable that contains `?` followed by the option and the option value like this `"?seed=yourNumber"` and then add it to the end of your URL.

``` JavaScript

var options = '?seed=123456'; // replace 1234567 with any number you would like
var url = 'https://graph-data-fewd.herokuapp.com/rest/' + options;
var ajax = new XMLHttpRequest();	
/* rest of code snippet from basic usage .... */

```

### Unit

The unit option allows you to specify whether you want the returned data in hours, days, or months. By default the unit is set to `day`. You can set the `unit` option as follows:

#### JQuery 

> For JQuery, you add in a `data` key and then give it a value of `unit=typeOfData`.

``` JavaScript
  $.ajax({
    url: 'https://graph-data-fewd.herokuapp.com/rest',
    data: 'unit=month', // or day or hour
    dataType: 'json',
    /* rest of code snippet from basic usage .... */

```

#### ECMA2015 and traditional JS

> For the other languages you create a string variable that contains `/?` followed by the option and the option value like this `"?unit=typeOfData"` and then add it to the end of your URL.

``` JavaScript

var options = '/?unit=month'; // or day or hour
var url = 'https://graph-data-fewd.herokuapp.com/rest/' + options;
var ajax = new XMLHttpRequest();	
/* rest of code snippet from basic usage .... */

```

### Count

The count option allows you to specify how much data gets returned from the GET request. The default value for count depends on the unit type. For `hour` units the default is `24`, for `day` units the default is `30`, and for `month` units the default is `12`. You can specify any integer value for `count`, just be aware that the higher the number, the longer the response may take.

#### JQuery 

> For JQuery, you add in a `data` key and then give it a value of `count=number`.

``` JavaScript
  $.ajax({
    url: 'https://graph-data-fewd.herokuapp.com/rest',
    data: 'count=43', // replace 43 with any number you would like
    dataType: 'json',
    /* rest of code snippet from basic usage .... */

```

#### ECMA2015 and traditional JS

> For the other languages you create a string variable that contains `/?` followed by the option and the option value like this `"?unit=typeOfData"` and then add it to the end of your URL.

``` JavaScript

var options = '/?count=43'; // replace 43 with any number you would like
var url = 'https://graph-data-fewd.herokuapp.com/rest/' + options;
var ajax = new XMLHttpRequest();	
/* rest of code snippet from basic usage .... */

```

### Multiple options

> Setting multiple options allows you to be very specific with the data that gets returned by the API request. The way you pass multpile options is to chain them together with a `&` symbol, like in the following examples:

#### JQuery 

``` JavaScript
  $.ajax({
    url: 'https://graph-data-fewd.herokuapp.com/rest',
    // only add the options you need, you don't have to use all three
    // the order of the options doesn't matter
    data: 'seed=1234567&unit=month&count=43',
    dataType: 'json',
    /* rest of code snippet from basic usage .... */

```

#### ECMA2015 and traditional JS

``` JavaScript
// only add the options you need, you don't have to use all three
// the order of the options doesn't matter
var options = '/?seed=1234567&unit=month&count=43'; 
var url = 'https://graph-data-fewd.herokuapp.com/rest/' + options;
var ajax = new XMLHttpRequest();	
/* rest of code snippet from basic usage .... */

```

> Alternatively, you can use a template literal when creating you URL variable and add the values in that way. 

``` JavaScript

  var seed  = 123456;
  var unit  = 'month';
  var count = 43;

  var url = `https://graph-data-fewd.herokuapp.com/rest/?seed=${seed}&unit=${unit}&count=${count}`;

```

## Miscellaneous

> This API is hosted with a free account on heroku, the down side of this means that the app goes to "sleep" after 30 minutes of non usage. Because of this, it may take several seconds for the data to load if it has been awhile since the API has been used

### Good luck! If you have any issues using this API, please bring them up so that we can continue to make the app better!





