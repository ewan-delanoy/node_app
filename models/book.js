const util = require('util');
let mc = require('./mysql_connection');


async function mcCreateModel(connection) {
    sql = 'CREATE TABLE `books` (' +
        '`id` int(11) PRIMARY KEY,' +
        '`title` varchar(50) NOT NULL,' +
        '`image` varchar(255) NOT NULL,' +
        '`description` mediumtext' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (error, results, fields) {
            if (error) {
                console.log("Error in book.createModel : ", error);
                reject(error);
            } else {
                resolve(results);
            }
        });
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

async function mcDropModel(connection) {
    return mc.dropModel(connection, 'books');
}


async function mcInsertValue(connection, data) {
    let sql1 = 'SELECT MAX(`id`) as maxid FROM `books`';
    return new Promise(function (resolve, reject) {
        connection.query(sql1, function (error1, results1, fields1) {
            if (error1) {
                reject(error1);
            } else {
                let idx1 = results1[0].maxid + 1;
                let sql2 = 'INSERT INTO `books` (`id`,`title`,`image`,`description`) VALUES(?,?,?,?);';
                connection.query(sql2, [idx1, data.title, data.image, data.description], function (error2, results2, fields2) {
                    if (error2) {
                        reject(error2);
                    } else {
                        resolve(idx1);
                    }
                });
            }
        });
    }).catch(err => console.log("Error in mcInsertValue : ", err));
}

async function mcSeedModel(connection) {
    await mcInsertValue(connection,
        {
            title: 'Barren Metal',
            image: 'https://i.ibb.co/9chC4tL/barren-metal.jpg',
            description: 'd1'
        });
    await mcInsertValue(connection,
        {
            title: 'The Missisipi flows into the Tiber',
            image: 'https://i.ibb.co/WpG5Hd9/mississipi.jpg',
            description: 'd2'
        });
    await mcInsertValue(connection,
        {
            title: 'The broken pump in Tanzania',
            image: 'https://i.ibb.co/3mf7fzz/pump-in-tanzania.jpg',
            description: 'd3'
        });
}

function mcSeekItem(connection, bookId) {
    sql = 'SELECT id,title,image,description FROM `books` WHERE `id` = ? ;';
    return new Promise(function (resolve, reject) {
        connection.query(sql, bookId, function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    }).catch(err => console.log("Error in mcSeekItem : ", err));

}

async function mcSeekAllItems(connection) {
    return new Promise(function (resolve, reject) {
        connection.query('SELECT * FROM `books`', function (error, results, fields) {
            if (error) {
                console.log("Error in book.seekAllItems : ", error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    }).catch(err => console.log("Error in mcSeekAllItems : ", err));
}

async function mcUpdateValue(connection, data) {
    let sql1 = 'UPDATE `books` SET `title`=?, `image`=?, `description`=? ' +
        'WHERE `id`=?;';
    return new Promise(function (resolve, reject) {
        connection.query(sql1, [data.title, data.image, data.description, data.id],
            function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            }
        );
    }).catch(err => console.log("Error in mcUpdateValue : ", err));
}


module.exports = {
    createModel: mcCreateModel,
    dropModel: mcDropModel,
    insertValue: mcInsertValue,
    seedModel: mcSeedModel,
    seekAllItems: mcSeekAllItems,
    seekItem: mcSeekItem,
    updateValue: mcUpdateValue,
};

/*
connection = mysqlModule.initiateConnection();
bookModule.dropModel(connection);
bookModule.createModel(connection);
bookModule.seedModel(connection);
*/
