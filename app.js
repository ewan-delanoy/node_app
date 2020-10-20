
const express = require('express');
const app = express();
const path = require('path');



var connection = {};

const mysqlModule = require('./models/mysql_connection.js');
const bookModule = require('./models/book.js');

/* checkpoint */


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
/* app.use(express.static(__dirname + '/public')); */

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3007, '127.0.0.1', () => {
  /*
  connection = mysqlModule.initiateConnection();
  userModule.seekItemId(connection,'Suzanne Vega',function(results){console.log(results);console.log(results.length);});
  */
  connection = mysqlModule.initiateConnection();
  bookModule.dropModel(connection);
  bookModule.createModel(connection);
  bookModule.seedModel(connection);
  console.log("Serving on port 3000");
});

