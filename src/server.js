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
var morgan = require('morgan');

const app = express()
const port = process.env.PORT;

app.use((req, res, next) => {
    console.log("Run into >>");
    console.log(req.method)
    next();
});
app.use(morgan('combined'));

//config middleware de su dung ben web.js
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

//init API route
initAPIRoute(app);

//handle 404 not found (dung middleware o tang cao nhat)
app.use((req, res) => {
    return res.render('404.ejs')
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})