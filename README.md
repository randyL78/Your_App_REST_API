# Your App REST API

## This API is designed to provide data for the "Web App Dashboard" project from Treehouse

> This project does not claim to be an official addition to the project and was not created or condoned by Treehouse.

## How to use

## Basic version with default parameters

> You can use AJAX to call the Graph Data REST API and will recieve by default 8 weeks worth of "weekly" data. The default implementation is as follows:

### if you are using JQuery:

``` JavaScript

  $.ajax({
    url: 'https://yourappdata.com/rest/',
    dataType: 'json',
    success: function(data) {
      /* the console.log just displays the data, in your app you will 
      want to pass that data to another method or assign it to a 
      varaible outside of the ajax scope */
      console.log(data);
    }
  });

```

### if you are using ECMA 2015 syntax:

``` JavaScript

const url = 'https://yourappdata.com/rest/';
const ajax = new XMLHttpRequest();	
// wait until data has been retrieved
ajax.onreadystatechange = () => {
  if(ajax.readyState === 4) {
    const data = JSON.parse(ajax.responseText);
    /* the console.log just displays the data, in your app you will want 
    to pass that data to another method or assign it to a varaible 
    outside of the ajax scope */
    console.log(data)
  }
};
ajax.open('GET', url);
ajax.send();
  
```

### traditonal JavaScript syntax:

``` JavaScript

var url = 'https://yourappdata.com/rest/';
var ajax = new XMLHttpRequest();	
// wait until data has been retrieved
ajax.onreadystatechange = (function () {
  if(ajax.readyState === 4) {
    var data = JSON.parse(ajax.responseText);
    /* the console.log just displays the data, in your app you will want 
    to pass that data to another method or assign it to a varaible 
    outside of the ajax scope */
    console.log(data)
  }
});
ajax.open('GET', url);
ajax.send();

```