var mc = require('./mysql_connection');
var mcInitiateConnection = mc.initiateConnection ;


function mcCreateModel(connection) {
  sql='CREATE TABLE `comments` (' +
      '`id` int(11) NOT NULL,' +
      '`book_id` int(11) NOT NULL,' +
      '`author` varchar(50) NOT NULL,' +
      '`text` mediumtext' +
      ') ENGINE=InnoDB DEFAULT CHARSET=utf8;' ;
  connection.query(sql, function (error, results, fields) {
      if (error)
          throw error;
  });
}


function mcDropModel(connection) {
  mc.dropModel(connection,'comments');
}

function mcInsertValue(connection,data,aftermath) {
  sql1='SELECT MAX(`id`) as maxid FROM `comments`';
  connection.query(sql1, function (error1, results1, fields1) {
      if (error1)
          throw error1;
      idx1 = results1[0].maxid + 1;
      sql2='INSERT INTO `comments` (`id`,`book_id`,`author`,`text`) VALUES(?,?,?,?);';
      connection.query(sql2, [idx1,data.book_id,data.author,data.text], function (error, results, fields) {
          if (error) {
              throw error;
          } else {
            aftermath();
          }
      });
  });
}

function mcSeedModel(connection) {
  mcInsertValue(connection,{book_id:1,author:'Homer',text:'This place (1) is great, but I wish there was internet'},function(){
    mcInsertValue(connection,{book_id:2,author:'Homer',text:'This place (2) is great, but I wish there was internet'},function(){
      mcInsertValue(connection,{book_id:3,author:'Homer',text:'This place (3) is great, but I wish there was internet'},function(){
        mcInsertValue(connection,{book_id:2,author:'Homer',text:'This place (4) is great, but I wish there was internet'},function(){});
      });
    });
  });
}


module.exports={
    createModel : mcCreateModel,
    dropModel : mcDropModel,
    initiateConnection : mcInitiateConnection,
    insertValue : mcInsertValue,
    seedModel : mcSeedModel
};

/*
connection = commentModule.initiateConnection();
commentModule.dropModel(connection);
commentModule.createModel(connection);
commentModule.seedModel(connection);
*/
