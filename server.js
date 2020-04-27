//SERVER CODE
let express = require('express');
let app = express();
let bodyParser = require("body-parser");
let path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public", {maxAge: 3456700000})); 
let a = require("./index");
if (app.settings.env === 'development') process.env.NODE_ENV = 'development';
require("dotenv").config();
let hashtagArr = [];

function appendHash(req,res,next){
        let hashtag = req.body.hashtag;
        hashtagArr.push(hashtag);
        next();
}
function myCallback(req,res,next){
        console.log('in the callbak',hashtagArr);
        a.main(hashtagArr[0]);
        res.end();
}
//configuring routes
//defining express routes
app.get('/', function (req,res) {
        res.sendFile('index.html', {root : __dirname});
        });
     
app.post('/', appendHash,myCallback);



//server
app.listen(3000, function () {
        console.log("Node server running");
});



