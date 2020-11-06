
let mc = require('./mysql_connection');


async function mcCreateModel(connection) {
    sql = 'CREATE TABLE `books` (' +
        '`id` int(11) PRIMARY KEY,' +
        '`title` varchar(50) NOT NULL,' +
        '`image` varchar(255) NOT NULL,' +
        '`publisher` varchar(255) NOT NULL,' +
        '`price` decimal(6,2) NOT NULL,' +
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
  `publisher` varchar(255) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `description` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/

async function mcDeleteValue(connection, bookId) {
    let sql1 = 'DELETE FROM `books` WHERE `id`=?;';
    return new Promise(function (resolve, reject) {
        connection.query(sql1, bookId,
            function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            }
        );
    }).catch(err => console.log("Error in mcDeleteValue : ", err));
}

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
                let sql2 = 'INSERT INTO `books` (`id`,`title`,`image`,`publisher`,`price`,`description`) VALUES(?,?,?,?,?,?);';
                connection.query(sql2, [idx1, data.title, data.image, data.publisher, data.price, data.description], function (error2, results2, fields2) {
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
            publisher: 'Fidelity Press',
            price: '12.21',
            description: 'Bacon ipsum dolor amet short loin shoulder buffalo drumstick andouille pork belly bresaola meatloaf. Beef capicola meatball pork loin jowl drumstick pork boudin sausage beef ribs ball tip short ribs pork belly. Cupim ham biltong pancetta picanha, kielbasa alcatra shankle landjaeger shoulder pork chop ribeye tri-tip. Corned beef rump ham hock boudin brisket strip steak alcatra burgdoggen porchetta ham tri-tip. Jowl salami chuck pig pork belly burgdoggen, swine bresaola kevin.'
        });
    await mcInsertValue(connection,
        {
            title: 'The Missisipi flows into the Tiber',
            image: 'https://i.ibb.co/WpG5Hd9/mississipi.jpg',
            price: '50.00',
            publisher: 'Austin Press',
            description: 'Doner shank buffalo pork loin beef chislic. Andouille fatback chicken leberkas rump tenderloin ball tip burgdoggen landjaeger pork belly tri-tip ham hock t-bone short loin. Pork loin jerky spare ribs flank ball tip rump tail fatback. Pastrami sausage pork chop, tri-tip prosciutto beef ribs tail pork chuck brisket strip steak. Tail jerky ham hock ham kevin. Pancetta shankle pork, burgdoggen swine tri-tip t-bone alcatra strip steak porchetta filet mignon short loin pastrami brisket rump. Flank short loin sirloin spare ribs, pork chop capicola picanha ball tip chislic beef ribs swine buffalo pork belly alcatra.'
        });
    await mcInsertValue(connection,
        {
            title: 'The broken pump in Tanzania',
            image: 'https://i.ibb.co/3mf7fzz/pump-in-tanzania.jpg',
            price: '20.00',
            publisher: 'Green Press',
            description: 'Chuck prosciutto ham hock, frankfurter doner boudin pancetta. Sirloin kielbasa strip steak, biltong doner jowl beef ribs meatball andouille tail. Pork chop cow tri-tip hamburger fatback ground round pastrami, meatball short loin kielbasa frankfurter. Beef ribs tongue burgdoggen venison kevin. Turducken leberkas capicola ball tip flank short loin. Brisket shoulder t-bone pig, flank drumstick prosciutto meatball short loin venison spare ribs. Andouille tongue frankfurter, pork belly kevin picanha tenderloin salami capicola.'
        });
}

function mcSeekItem(connection, bookId) {
    sql = 'SELECT id,title,image,price,description FROM `books` WHERE `id` = ? ;';
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
    let sql1 = 'UPDATE `books` SET `title`=?, `image`=?, ' +
        '`publisher`=?, `price`=?, `description`=? ' +
        'WHERE `id`=?;';
    return new Promise(function (resolve, reject) {
        connection.query(sql1, [data.title, data.image, data.publisher, data.price, data.description, data.id],
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
    deleteValue: mcDeleteValue,
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
