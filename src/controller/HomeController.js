import { json } from "body-parser";
import pool from "../configs/connectDB";
import { Router } from "express";
import multer from 'multer';

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

let getUploadFile = async (req, res) => {
    return res.render('uploadFILE.ejs')
}

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'upload/')
//     },

//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const imageFilter = function (req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//         req.fileValidationError = 'only image files are allowed!';

//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// }

// const upload = multer().single('profile_pic');

// const uploadMultiple = multer().array('multiple_images');

let handleUploadFile = async (req, res) => {
    // let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');
    // console.log(req.file);
    // upload(req, res, function (err) {
    //kiem tra validation cua file
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    // else if (err instanceof multer.MulterError) {
    //     return res.send(err);
    // }
    // else if (err) {
    //     return res.send(err);
    // }
    //Hien thi single file
    res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    // });
}

let HandleUploadMultipleFile = async (req, res) => {
    // uploadMultiple(req, res, function (err) {

    // });
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }
    // else if (err instanceof multer.MulterError) {
    //     return res.send(err);
    // }
    // else if (err) {
    //     return res.send(err);
    // }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;
    //loop images
    for (index = 0, len = files.length; index < len; ++index) {
        //hien thi img
        result += `<img src="/img/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }

    result += '<hr/> <a href="/upload">Upload More images</a>';
    res.send(result);
}




module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    editUser,
    updateUser,
    getUploadFile,
    handleUploadFile,
    HandleUploadMultipleFile
}