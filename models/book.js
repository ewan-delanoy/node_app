const util = require('util');
let mc = require('./mysql_connection');


async function mcCreateModel(connection) {
    const sql = 'CREATE TABLE `books` (' +
        '`id` int(11) PRIMARY KEY,' +
        '`title` varchar(50) NOT NULL,' +
        '`price` varchar(50) NOT NULL,' +
        '`image` varchar(255) NOT NULL,' +
        '`description` mediumtext' +
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8;';
    return util.promisify(connection.query).call(sql).catch(
        error => console.log("Error 002 : ", error)
    );
}

/*
--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `price` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

async function mcDropModel(connection) {
    mc.dropModel(connection, 'books');
}


async function mcInsertValue(connection, data, aftermath) {
    const sql1 = 'SELECT MAX(`id`) as maxid FROM `books`';
    const idx1 = results1[0].maxid + 1;
    const results1 = await util.promisify(connection.query).call(sql1).catch(
        error => console.log("Error 003 : ", error)
    );
    const sql2 = 'INSERT INTO `books` (`id`,`title`,`price`,`image`,`description`) VALUES(?,?,?,?,?);';
    return util.promisify(connection.query).call(sql2,
        [idx1, data.title, data.price, data.image, data.description, data.location])
        .catch(
            error => console.log("Error 004 : ", error)
        );
}

async function mcSeedModel(connection) {
    await mcInsertValue(connection,
        {
            title: 'Barren Metal', price: '$20',
            image: 'https://i.ibb.co/9chC4tL/barren-metal.jpg',
            description: 'd1'
        });
    await mcInsertValue(connection,
        {
            title: 'The Missisipi flows into the Tiber', price: '$30',
            image: 'https://i.ibb.co/WpG5Hd9/mississipi.jpg',
            description: 'd2'
        });
    await mcInsertValue(connection,
        {
            title: 'The broken pump in Tanzania', price: '$40',
            image: 'https://i.ibb.co/3mf7fzz/pump-in-tanzania.jpg', description: 'd3'
        });
}

async function mcSeekItem(connection, bookId) {
    const sql = 'SELECT id,title,price,image,description FROM `books` WHERE `id` = ? ;';
    return util.promisify(connection.query).call(sql2, [bookId])
        .then(
            results => results[0]
        ).catch(
            error => console.log("Error 005 : ", error)
        );
}

async function mcSeekAllItems(connection) {
    const sql = 'SELECT * FROM `books`';
    return util.promisify(connection.query).call(sql)
        .then(
            results => results
        ).catch(
            error => console.log("Error 006 : ", error)
        );
}

module.exports = {
    createModel: mcCreateModel,
    dropModel: mcDropModel,
    insertValue: mcInsertValue,
    seedModel: mcSeedModel,
    seekAllItems: mcSeekAllItems,
    seekItem: mcSeekItem
};

/*
connection = mysqlModule.initiateConnection();
bookModule.dropModel(connection);
bookModule.createModel(connection);
bookModule.seedModel(connection);
*/
