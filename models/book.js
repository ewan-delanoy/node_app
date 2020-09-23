var mc = require('./mysql_connection');
var mcInitiateConnection = mc.initiateConnection ;


function mcCreateModel(connection) {
  sql='CREATE TABLE `books` (' +
      '`id` int(11) PRIMARY KEY,' +
      '`title` varchar(50) NOT NULL,' +
      '`image` varchar(255) NOT NULL,' +
      '`description` mediumtext' +
      ') ENGINE=InnoDB DEFAULT CHARSET=utf8;' ;
  connection.query(sql, function (error, results, fields) {
      if (error)
          throw error;
  });
}

/*
--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

function mcDropModel(connection) {
  mc.dropModel(connection,'books');
}


function mcInsertValue(connection,data,aftermath) {
  sql1='SELECT MAX(`id`) as maxid FROM `books`';
  connection.query(sql1, function (error1, results1, fields1) {
      if (error1)
          throw error1;
      idx1 = results1[0].maxid + 1;
      sql2='INSERT INTO `books` (`id`,`title`,`image`,`description`) VALUES(?,?,?,?);';
      connection.query(sql2, [idx1,data.title,data.image,data.description], function (error, results, fields) {
          if (error) {
              throw error;
          } else {
              aftermath();
          }
      });
  });
}

function mcSeedModel(connection) {
  mcInsertValue(connection,{title:'Barren Metal',image:'https://i.ibb.co/9chC4tL/barren-metal.jpg',description:'d1'},function(){
    mcInsertValue(connection,{title:'The Missisipi flows into the Tiber',image:'https://i.ibb.co/WpG5Hd9/mississipi.jpg',description:'d2'},function(){
      mcInsertValue(connection,{title:'The broken pump in Tanzania',image:'https://i.ibb.co/3mf7fzz/pump-in-tanzania.jpg',description:'d3'},function(){});
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
connection = bookModule.initiateConnection();
bookModule.dropModel(connection);
bookModule.createModel(connection);
bookModule.seedModel(connection);
*/
