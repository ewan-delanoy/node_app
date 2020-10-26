const mysql = require('mysql');
const util = require('util');


function mcInitiateConnection() {
  return (mysql.createConnection({
    host: 'localhost',
    database: 'local_gwl_database',
    port: '3306',
    user: 'root',
    password: 'raatDailyRoutine'

  }));
}


function mcDropModel(connection, modelName) {
  const sql = 'DROP TABLE IF EXISTS `' + modelName + '`';
  return util.promisify(connection.query).call(sql).catch(
    error => console.log("Error 001 : ", error)
  );
}

module.exports = {
  initiateConnection: mcInitiateConnection,
  dropModel: mcDropModel
};
