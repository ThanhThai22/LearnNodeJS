import express from "express";
import HomeController from "../controller/HomeController";
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');
let router = express.Router();
//Ham dc dinh nghia 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/img/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
//ket thuc

let upload = multer({ storage: storage, fileFilter: imageFilter });
let upload1 = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3);

const initWebRoute = (app) => {
    // router.get('/', (req, res) => {
    //     // res.send('Hello World! thai thanh')
    //     res.render("test/index.ejs")
    // })
    //viết theo mô hình MVC
    // app.METHOD(PATH, HANDLER)
    router.get('/', HomeController.getHomePage); //ko đc thêm dấu () vì sẽ gọi thẳng xuống tk con
    router.get('/detail/user/:id', HomeController.getDetailPage)
    router.post('/create-new-user', HomeController.createNewUser)
    router.post('/delete-user', HomeController.deleteUser)
    router.get('/edit-user/:id', HomeController.editUser)
    router.post('/update-user', HomeController.updateUser)
    router.get('/upload', HomeController.getUploadFile)
    router.post('/upload-profile-pic', upload.single('profile_pic'), HomeController.handleUploadFile)
    router.post('/upload-multiple-images', (req, res, next) => {
        upload1(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code == "LIMIT_UNEXCEPTED_FILE") {
                res.send("LIMIT_UNEXCEPTED_FILE");
            } else if (err) {
                res.send(err);
            }
            else {
                next();
            }
        })
    }, HomeController.HandleUploadMultipleFile)

    router.get('/about', (req, res) => {
        res.send('Thanh Thai')
    })


    return app.use('/', router); //tiền tố trước khi thêm route '/' nếu '/abc' thì '/abc/about' dùng để sau này sử dụng 'api/version' 
}

// module.exports = initWebRoute;
export default initWebRoute;