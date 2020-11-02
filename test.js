const mysql = require('mysql');
const util = require('util');

let connection = mysql.createConnection({
    host: 'localhost',
    database: 'local_gwl_database',
    port: '3306',
    user: 'root',
    password: 'yUJKL78L91P'
})

const sql1 = 'SELECT * FROM `books`';

function computeUsingFirstResult(results1) {
    const sql2 = 'SELECT title FROM `books` WHERE id = ' + ((results1[0]).id);
    return sql2;
}

function doSomething(connection, results1, results2) {
    console.log("Here are results1 : ", results1);
    console.log("Here are results2 : ", results2);
}

/*
connection.query(sql1, function (error1, results1, fields1) {
    if (error1) { console.log("Error during first query", error1); }
    sql2 = computeUsingFirstResult(results1);
    connection.query(sql2, function (error2, results2, fields2) {
        if (error2) { console.log("Error during second query", error2); }
        doSomething(connection, results1, results2);
    })
})
*/

async function firstQuery(connection) {
    return util.promisify(connection.query).call(sql1).catch(
        error1 => console.log("Error during first query : ", error1)
    );;
}

async function secondQuery(connection, result1) {
    let sql2 = computeUsingFirstResult(result1);
    return util.promisify(connection.query).call(sql2).catch(
        error2 => console.log("Error during second query : ", error2)
    );
}


let finalResult = {};
/*
async function main() {
    const results1 = await firstQuery(connection);
    const results2 = await secondQuery(connection, results1);
    doSomething(connection, results1, results2);
    finalResult = results2;
    await Promise.all(async () => {
        
        
        doSomething(connection, results1, results2);
    });
}

main().catch(
    err => console.log("Something went wrong towards the end : ", err)
);
*/


async function main() {
    try {
        const results1 = await firstQuery(connection);
        const results2 = await secondQuery(connection, results1);
        finalResult = results2;
        doSomething(connection, results1, results2);
        console.log("Here is the finalResult : ", finalResult);
    } catch (e) {
        err => console.log("Error : ", err);
    }
}

main().catch(
    err => console.log("Something went wrong towards the end : ", err)
);

