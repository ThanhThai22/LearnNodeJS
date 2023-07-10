import { json } from "body-parser";
import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {

    let data = [];
    // connection.query(
    //     'SELECT * FROM `users`',
    //     function (err, results, fields) {
    //         // console.log(">>check sql")
    //         // console.log(results); // results contains rows returned by server
    //         // console.log(results[0]); // results contains rows first index returned by server
    //         results.map((row) => {
    //             data.push({
    //                 id: row.id,
    //                 email: row.email,
    //                 firstname: row.firstname,
    //                 lastname: row.lastname,
    //                 address: row.address
    //             })
    //         });
    //         // console.log(fields); // fields contains extra meta data about results, if available
    //         // return res.render("index.ejs", { dataUser: data, test: 'abc string' })
    //     });
    //OR 
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');

    // let check = await pool.execute('SELECT * FROM `users`');
    // console.log(check);


    return res.render("index.ejs", { dataUser: rows, test: 'string test' })
}

let getDetailPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('SELECT * FROM users WHERE id =?', [id])

    return res.send(JSON.stringify(user))
}

module.exports = {
    getHomePage,
    getDetailPage
}