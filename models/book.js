var mc = require('./mysql_connection');
var mcInitiateConnection = mc.initiateConnection ;


function mcCreateModel(connection) {
  sql='CREATE TABLE `books` (' +
      '`id` int(11) NOT NULL,' +
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
  mc.dropModel(connection,'comments');
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
              connection.end();
              res.redirect('/books');
          }
      });
  });
});

function mcSeedModel(connection) {
  sql='INSERT INTO `books` (`id`, `title`, `image`, `description`) VALUES ' +
      '(1, \'Barren Metal\', \'https://i.ibb.co/9chC4tL/barren-metal.jpg\', \'d1\'),' +
      '(2, \'The Missisipi flows into the Tiber\', \'https://i.ibb.co/WpG5Hd9/mississipi.jpg\', \'d2\'),' +
      '(3, \'The broken pump in Tanzania\', \'https://i.ibb.co/3mf7fzz/pump-in-tanzania.jpg\', \'d3\');COMMIT;' ;
  connection.query(sql, function (error, results, fields) {
      if (error)
          throw error;
      /*
      connection.query('COMMIT;', function (error2, results2, fields2) {
              if (error2)
                  throw error2;
      });
      */
  });
}

/*
--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `image`, `description`) VALUES
(1, 'Barren Metal', 'https://i.ibb.co/9chC4tL/barren-metal.jpg', 'd1'),
(2, 'The Missisipi flows into the Tiber', 'https://i.ibb.co/WpG5Hd9/mississipi.jpg', 'd2'),
(3, 'The broken pump in Tanzania', 'https://i.ibb.co/3mf7fzz/pump-in-tanzania.jpg', 'd3'),
(4, 'abc', 'def', NULL),
(5, 'ddd56', 'tyuio', 'pqdfgtrs');
COMMIT;
*/

module.exports={
    createModel : mcCreateModel,
    dropModel : mcDropModel,
    initiateConnection : mcInitiateConnection,
    seedModel : mcSeedModel
};

/*
connection = commentModule.initiateConnection();
commentModule.dropModel(connection);
commentModule.createModel(connection);
commentModule.seedModel(connection);
*/
