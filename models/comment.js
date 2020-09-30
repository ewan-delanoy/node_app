var mc = require('./mysql_connection');


function mcCreateModel(connection) {
  sql='CREATE TABLE `comments` (' +
      '`id` int(11) PRIMARY KEY,' +
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
  mcInsertValue(connection,{book_id:1,author:'Homer',text:'Bacon ipsum dolor amet meatball boudin leberkas capicola tongue cow. Pork belly venison landjaeger, brisket ham ribeye sirloin hamburger beef fatback tail. Meatball landjaeger swine tongue jerky pig. Chislic tenderloin doner alcatra fatback drumstick sirloin strip steak buffalo andouille kevin salami chuck biltong. Ham swine leberkas salami beef pork belly.'},function(){
    mcInsertValue(connection,{book_id:2,author:'Homer',text:'Bacon ipsum dolor amet meatball boudin leberkas capicola tongue cow. Pork belly venison landjaeger, brisket ham ribeye sirloin hamburger beef fatback tail. Meatball landjaeger swine tongue jerky pig. Chislic tenderloin doner alcatra fatback drumstick sirloin strip steak buffalo andouille kevin salami chuck biltong. Ham swine leberkas salami beef pork belly.'},function(){
      mcInsertValue(connection,{book_id:3,author:'Homer',text:'Bacon ipsum dolor amet meatball boudin leberkas capicola tongue cow. Pork belly venison landjaeger, brisket ham ribeye sirloin hamburger beef fatback tail. Meatball landjaeger swine tongue jerky pig. Chislic tenderloin doner alcatra fatback drumstick sirloin strip steak buffalo andouille kevin salami chuck biltong. Ham swine leberkas salami beef pork belly.'},function(){
        mcInsertValue(connection,{book_id:2,author:'Homer',text:'Bacon (2) ipsum dolor amet meatball boudin leberkas capicola tongue cow. Pork belly venison landjaeger, brisket ham ribeye sirloin hamburger beef fatback tail. Meatball landjaeger swine tongue jerky pig. Chislic tenderloin doner alcatra fatback drumstick sirloin strip steak buffalo andouille kevin salami chuck biltong. Ham swine leberkas salami beef pork belly.'},function(){});
      });
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
commentModule.dropModel(connection);
commentModule.createModel(connection);
commentModule.seedModel(connection);
*/
