

var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = {};

function myCreateConnection() {
  connection = mysql.createConnection({
      host     : 'localhost',
      database : 'local_gwl_database',
      port     : '3306',
      user     : 'root',
      password : '***********'

  });
}



var app = express();


app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/books', function(req, res) {
  myCreateConnection();
  connection.query('SELECT * FROM books', function (error, results, fields) {
      if (error)
          throw error;
      res.render('books',{books:results});
  });
  connection.end();
});

app.post('/books', function(req, res) {
  var name = req.body.name ;
  var image = req.body.image ;
  var newBook = {name:name,image:image} ;
  myCreateConnection();
  // save to database
  sql='`INSERT INTO books(title,image) VALUES('+ name + 'n' + image +')`;`'
  connection.query(sql, function (error, results, fields) {
      if (error)
          throw error;
  });
  connection.end();
  res.redirect('/books');
});

app.get('/books/new', function(req, res) {
  res.render('new.ejs');
});

app.listen(3007,'127.0.0.1',function() {
     console.log("Server has started !")
});
