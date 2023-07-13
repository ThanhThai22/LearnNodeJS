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

// const express = require('express')
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import initAPIRoute from "./route/api";
// import connection from "./configs/connectDB";
require('dotenv').config();

const app = express()
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init API route
initAPIRoute(app);




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})