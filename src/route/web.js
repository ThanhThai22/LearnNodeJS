import express from "express";
import HomeController from "../controller/HomeController";

let router = express.Router();

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
    router.get('/about', (req, res) => {
        res.send('Thanh Thai')
    })


    return app.use('/', router); //tiền tố trước khi thêm route '/' nếu '/abc' thì '/abc/about' dùng để sau này sử dụng 'api/version' 
}

// module.exports = initWebRoute;
export default initWebRoute;