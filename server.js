const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const db = require('./db');


app = express();
port = 5555;
app.listen(port,()=>{
console.log("::::::::::::::::: | Project: Apnahood | :::::::::::::");
console.log("Date: " + new Date());
console.log("Api server started on: " + port);
})


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var routes = require(".//appRoute");

routes(app);