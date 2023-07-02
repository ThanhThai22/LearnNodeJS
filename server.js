// const http = require('http');

// const server = http.createServer((req, res) => {
//     console.log('run request ...')
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<h3>Hello World!</h3>');
//     res.end();
// })

// server.listen(3000, 'localhost', () => {
//     console.log('NodeJS server is running on port: 3000');
// })

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World! thai thanh')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})