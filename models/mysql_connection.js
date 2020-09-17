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


function mcDropModel(connection,modelName) {
  sql = 'DROP TABLE IF EXISTS `' + modelName + '`';
  sql2 = 'COMMIT;'
  connection.query(sql, function (error, results, fields) {
      if (error)
          throw error;
          connection.query(sql2, function (error2, results2, fields2) {
              if (error2)
                  throw error2;
          });
  });
}

module.exports={
    initiateConnection : mcInitiateConnection,
    dropModel : mcDropModel
};
