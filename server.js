//SERVER CODE
let express = require('express');
let app = express();
let bodyParser = require("body-parser");
let path = require('path');
var reload = require('express-reload')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public", {maxAge: 3456700000})); 
let a = require("./index");
if (app.settings.env === 'development') process.env.NODE_ENV = 'development';
require("dotenv").config();

let LUMUSERNAME = process.env.LUMUSERNAME;
let LUMPASSWORD= process.env.LUMPASSWORD;
//configuring routes
//defining express routes
app.get('/', function (req,res) {
        res.sendFile('index.html', {root : __dirname});
        });
     
app.post('/', function (req,res) {
        let hashtag = req.body.hashtag;
        res.send(hashtag + 'POST REQUEST MADE');
        console.log(hashtag,'hashtag');
        a.main(hashtag)   ;


});


//server
app.listen(3000, function () {
        console.log("Node server running");
});



