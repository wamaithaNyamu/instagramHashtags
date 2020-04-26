let express = require('express');
let app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
let a = require("./index");
//configuring routes

//defining express routes
app.get('/', function (req,res) {
        res.sendFile('index.html', {root : __dirname});
        });
     
app.post('/submit-hashtag', function (req,res) {
        let hashtag = req.body.hashtag;
        res.send(hashtag + 'POST REQUEST MADE');
        console.log(hashtag,'hashtag');
        a.getHashtag(hashtag)
     
     

});


//server
app.listen(3000, function () {
        console.log("Node server running");
});


//go to instagram
const instagram = 'https://www.instagram.com/explore/tags/shoes/'
//search by query
//form to enter query
//show user results
//add button to queries they want to use
//copy all selected hashtags
//allow maximum of thirty hashtags
