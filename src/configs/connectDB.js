// get the client
// const mysql = require('mysql2');
import mysql from "mysql2/promise";

// create the connection to database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodeyoutube'
});

// simple query
// connection.query(
//     'SELECT * FROM `users`',
//     function (err, results, fields) {
//         console.log(">>check sql")
//         console.log(results); // results contains rows returned by server
//         // console.log(results[0]); // results contains rows first index returned by server
//         let rows = results.map((row) => { return row });
//         // console.log(fields); // fields contains extra meta data about results, if available
//         console.log(rows);
//     }
// );

export default pool;

// with placeholder
// connection.query(
//     'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//     ['Page', 45],
//     function (err, results) {
//         console.log(results);
//     }
// );