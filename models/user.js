var mc = require('./mysql_connection');
var bcrypt = require('bcrypt');

function mcCreateModel(connection) {
  sql='CREATE TABLE `users` (' +
      '`id` int(11) PRIMARY KEY,' +
      '`username` varchar(50) NOT NULL,' +
      '`password` varchar(255) COLLATE utf8_bin NOT NULL' +
      ') ENGINE=InnoDB DEFAULT CHARSET=utf8;' ;
  connection.query(sql, function (error, results, fields) {
      if (error)
          throw error;
  });
}


function mcDropModel(connection) {
  mc.dropModel(connection,'users');
}

function mcInsertValue(connection,data,aftermath) {
  sql1='SELECT MAX(`id`) as maxid FROM `users`';
  connection.query(sql1, function (error1, results1, fields1) {
      if (error1)
          throw error1;
      idx1 = results1[0].maxid + 1;
      bcrypt.hash(data.password,12,function(err,hash){
        sql2='INSERT INTO `users` (`id`,`username`,`password`) VALUES(?,?,?);';
        connection.query(sql2, [idx1,data.username,hash], function (error, results, fields) {
            if (error) {
                throw error;
            } else {
              aftermath();
            }
        });
      })

  });
}

function mcSeedModel(connection) {
  mcInsertValue(connection,{username:'Bart Simpson',password:'password'},function(){
    mcInsertValue(connection,{username:'Suzanne Vega',password:'susie'},function(){
      mcInsertValue(connection,{username:'Conan Doyle',password:'password'},function(){});
    });
  });
}


module.exports={
    createModel : mcCreateModel,
    dropModel : mcDropModel,
    insertValue : mcInsertValue,
    seedModel : mcSeedModel
};

/*
connection = mysqlModule.initiateConnection();
userModule.dropModel(connection);
userModule.createModel(connection);
userModule.seedModel(connection);
*/
