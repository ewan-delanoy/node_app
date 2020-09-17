


var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = {};

var bookModule = require ('./models/book.js');
var commentModule = require ('./models/comment.js');

/* checkpoint */

var app = express();



app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
	res.render('landing');
});

// INDEX route
app.get('/books', function(req, res) {
  connection = bookModule.initiateConnection();
  connection.query('SELECT * FROM `books`', function (error, results, fields) {
      if (error)
          throw error;
      res.render('index',{books:results});
  });
  connection.end();
});

// CREATE route
app.post('/books', function(req, res) {
   connection = bookModule.initiateConnection();
   bookModule.insertValue(connection,req.body,function(){
     connection.end();
     res.redirect('/books');
   });
});


// NEW route
app.get('/books/new', function(req, res) {
  res.render('new.ejs');
});

// SHOW route
app.get('/books/:id', function(req, res) {
  connection = bookModule.initiateConnection();
  sql1='SELECT title,image,description FROM `books` WHERE `id` = ? ;' ;
  connection.query(sql1, [req.params.id], function (error, results,foundBook, fields) {
      if (error) {
          throw error;
      } else {
          connection.end();
          foundBook = results[0];
          res.render('show.ejs',{book:foundBook});
      }
  });


});


app.listen(3007,'127.0.0.1',function() {
     console.log("Server has started !");
});

/*
const request = require('request');

request('https://127.0.0.1:3007/', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});
*/
