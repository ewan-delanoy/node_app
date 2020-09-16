var mysql = require('mysql');


function mcInitiateConnection() {
  return( mysql.createConnection({
      host     : 'localhost',
      database : 'local_gwl_database',
      port     : '3306',
      user     : 'root',
      password : 'yUJKL78L91P'

  }));
}

module.exports={
    initiateConnection : mcInitiateConnection
};
