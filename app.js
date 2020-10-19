
var express = require('express');

var connection = {};

var mysqlModule = require('./models/mysql_connection.js');

/* checkpoint */

var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.listen(3007, '127.0.0.1', function () {
  /*
  connection = mysqlModule.initiateConnection();
  userModule.seekItemId(connection,'Suzanne Vega',function(results){console.log(results);console.log(results.length);});
  */
  console.log("Server has started !");
});

