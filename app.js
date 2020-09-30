


var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local');


var connection = {};

var mysqlModule = require ('./models/mysql_connection.js');
var bookModule = require ('./models/book.js');
var commentModule = require ('./models/comment.js');
var userModule = require ('./models/user.js');

/* checkpoint */

var app = express();



app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

// passport configuration

app.use(require("express-session")({
   secret: 'On the road again ...',
   resave: false,
   saveUninitialized: false

}))

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
	res.render('landing');
});

// INDEX route
app.get('/books', function(req, res) {
  connection = mysqlModule.initiateConnection();
  bookModule.seekAllItems(connection,function(results){
     connection.end();
     res.render('books/index',{books:results});
  });
});

// CREATE route
app.post('/books', function(req, res) {
   connection = mysqlModule.initiateConnection();
   bookModule.insertValue(connection,req.body,function(){
     connection.end();
     res.redirect('/books');
   });
});


// NEW route
app.get('/books/new', function(req, res) {
  res.render('books/new');
});

// SHOW route
app.get('/books/:id', function(req, res) {
  connection = mysqlModule.initiateConnection();
  bookId = req.params.id;
  bookModule.seekItem(connection, bookId, function(){}, function(foundBook){
    commentModule.seekAssociatedItems(connection, bookId, function(){},function(foundComments){
      connection.end();
      res.render('books/show',{book:foundBook,comments:foundComments});
    });
  });
});

// =======================================================
// COMMENTS ROUTES
// =======================================================



// NEW route
app.get('/books/:id/comments/new', function(req, res) {
  connection = mysqlModule.initiateConnection();
  bookId = req.params.id ;
  bookModule.seekItem(connection, bookId, function(){}, function(foundBook){
    connection.end();
    res.render('comments/new',{book:foundBook});
  });
});

// CREATE route
app.post('/books/:id/comments', function(req, res) {
   connection = mysqlModule.initiateConnection();
   bookId = req.params.id ;
   bookModule.seekItem(connection, bookId,function(){res.redirect("/books");}, function(foundBook){
     foundComment = req.body.comment;
     foundData = {book_id:bookId,author:foundComment.author,text:foundComment.text};
     commentModule.insertValue(connection,foundData,function(){
       connection.end();
       res.redirect('/books/' + bookId );
     });
  });
});


// ======
// AUTH routes

app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register', function(req, res) {
    res.render('register');
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
