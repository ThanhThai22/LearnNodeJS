import pool from "../configs/connectDB";
let getAllUser = async (req, res) => {
    //http
    //404: loi 
    //501: sap server
    // tra ve dang json hoac xml (chu yeu la json) => object

    const [rows, fields] = await pool.execute('SELECT * FROM `users`');

    return res.status(200).json({
        message: "thai",
        data: rows
    })
}

let createNewUser = async (req, res) => {

    let { firstname, lastname, email, address } = req.body; //phuong phap destructuring

    if (!firstname || !lastname || !email || !address) {
        return res.status(200).json({
            message: 'miss required params'
        })
    }

    await pool.execute('insert into users(firstname, lastname, email, address) values (?, ?, ?, ?)', [firstname, lastname, email, address]);

    return res.status(200).json({
        message: 'ok'
    })
}
let updateUser = async (req, res) => {

    let { firstname, lastname, email, address, id } = req.body

    if (!firstname || !lastname || !email || !address || !id) {
        return res.status(200).json({
            message: 'miss required params'
        })
    }

    await pool.execute('update users set firstname=?, lastname=?, email=?, address=? where id=?', [firstname, lastname, email, address, id]);

    return res.status(200).json({
        message: 'ok'
    })
}

let deleteUser = async (req, res) => {

    let userid = req.params.id;

    if (!userid) {
        return res.status(200).json({
            message: 'miss required params'
        })
    }

    await pool.execute('delete from users where id=?', [userid]);

    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllUser, createNewUser, deleteUser, updateUser
}