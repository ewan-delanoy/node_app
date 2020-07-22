

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
      password : 'raatDailyRoutine'

  });
}

/* checkpoint */

var app = express();


app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
	res.render('landing');
});

// INDEX route
app.get('/books', function(req, res) {
  myCreateConnection();
  connection.query('SELECT * FROM `books`', function (error, results, fields) {
      if (error)
          throw error;
      res.render('index',{books:results});
  });
  connection.end();
});

// CREATE route
app.post('/books', function(req, res) {
  var title = req.body.title ;
  var image = req.body.image ;
  var descr = req.body.description ;
  myCreateConnection();
  // save to database
  /* sql='INSERT INTO `books` (`ìd`,`title`,`image`) VALUES(\'7\',\''+ name + '\',\'' + image +'\');'; */
  sql1='SELECT MAX(`id`) as maxid FROM `books`';
  connection.query(sql1, function (error1, results1, fields1) {
      if (error1)
          throw error1;
      idx1 = results1[0].maxid + 1;
      sql2='INSERT INTO `books` (`id`,`title`,`image`,`description`) VALUES(?,?,?,?);';
      connection.query(sql2, [idx1,title,image,descr], function (error, results, fields) {
          if (error) {
              throw error;
          } else {
              connection.end();
              res.redirect('/books');
          }
      });
  });
});

// NEW route
app.get('/books/new', function(req, res) {
  res.render('new.ejs');
});

// SHOW route
app.get('/books/:id', function(req, res) {
  myCreateConnection();
  sql1='SELECT title,image,description FROM `books` WHERE `id` = ? ;' ;
  connection.query(sql1, [req.params.id], function (error, results,foundBook, fields) {
      if (error) {
          throw error;
      } else {
          /* console.log(results); */
          connection.end();
          console.log(results[0]);
          console.log(results[0].title);
          foundBook = results[0];
          res.render('show.ejs',{book:foundBook});
      }
  });


});


app.listen(3007,'127.0.0.1',function() {
     console.log("Server has started !")
});
