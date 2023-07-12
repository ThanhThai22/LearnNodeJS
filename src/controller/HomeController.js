import { json } from "body-parser";
import pool from "../configs/connectDB";
import { Router } from "express";

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

let createNewUser = async (req, res) => {
    // console.log(req.body)
    let { firstname, lastname, email, address } = req.body; //phuong phap destructuring
    await pool.execute('insert into users(firstname, lastname, email, address) values (?, ?, ?, ?)', [firstname, lastname, email, address]);
    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    let userid = req.body.userid;
    await pool.execute('delete from users where id=?', [userid]);
    return res.redirect(`/`);
}

let editUser = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('select * from users where id=?', [id]);
    return res.render('updateUser.ejs', { dataUser: user[0] });
}

let updateUser = async (req, res) => {
    let { firstname, lastname, email, address, id } = req.body
    await pool.execute('update users set firstname=?, lastname=?, email=?, address=? where id=?', [firstname, lastname, email, address, id]);
    return res.redirect('/')
}

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    editUser,
    updateUser
}