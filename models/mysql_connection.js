const mysql = require('mysql');


function mcInitiateConnection() {
  return (mysql.createConnection({
    host: 'localhost',
    database: 'local_gwl_database',
    port: '3306',
    user: 'root',
    password: 'raatDailyRoutine'

  }));
}


async function mcDropModel(connection, modelName) {
  const sql = 'DROP TABLE IF EXISTS `' + modelName + '`';
  return new Promise(function (resolve, reject) {
    connection.query(sql, function (error, results, fields) {
      if (error) {
        console.log("Error in mcDropModel : ", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  initiateConnection: mcInitiateConnection,
  dropModel: mcDropModel
};
