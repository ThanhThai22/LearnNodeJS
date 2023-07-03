# LearnNodeJS
LearnNodeJS
-- câu lệnh cài đặt gói : "npm install --save-exact 'tên gói'@'tên phiên bản' "
- đầu tiên khởi tạo gói 'package.json' => "npm init" => cấu hình theo yêu cầu phần mềm ko thì enter hết
- cài đặt thư viện để sử dụng 'express.js' => "npm install --save-exact express@'tên phiên bản' " => ta có đc file 'package-lock.json' và folder 'node_modules'
- tạo một file ' .gitignore' ghi vào đó tên file hoặc folder ko muốn đẩy lên => node_modules (vì size quá lớn nếu up lên trao đổi thì rất lâu.) => up tất cả lên github trong đó có file .gitignore
- để clone về máy => vào folder cần clone bật GUI pash lên => git clone link tới github clone => trong đó có file .gitignore => sử dụng câu lệnh 'npm install' về máy để tải gói node_modules đã cài.
- có nhiều framework trong nodejs vào link để xem: 'https://expressjs.com/en/resources/frameworks.html'
- sử dụng template engines : EJS (vì một phần nó giống với laravel đã học) => npm install --save-exact ejs@'tên phiên bản'
- cài đặt 'body-parser', 'nodemon', '@babel/core', '@babel/node', 'babel/preset-env'
  câu lệnh cài đặt tất cả các gói trên cùng lúc :
    => npm install --save-exact body-parser@1.19.0 nodemon@2.0.12 @babel/core@7.15.5 @babel/node@7.15.4 @babel/preset-env@7.15.6
- tạo một file configs bên ngoài folder configs => '.babelrc' <= (tên file) 
- di chuyển file server.js vào bên trong thư mục src
- mở file package.json => sửa "start": "node server.js" thành => "start": "nodemon --exec babel-node src/server.js"
- sau đó thay vì chạy lệnh 'node server.js' để khởi động server thì bây h ta có thể sử dụng lệnh => 'npm start' 1 lần duy nhất
- tải thêm package dotenv để khai báo biến môi trường => npm install --save-exact dotenv@10.0.0
