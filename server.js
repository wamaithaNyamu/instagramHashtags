let express = require('express');
let app = express();


//configuring routes

//defining express routes
app.get('/', function (req,res) {
        res.send('HELLO!!');
        });

app.post('/submit-data', function (req,res) {
        res.send('POST REQUEST MADE');

});

app.put('/update-data', function (req,res) {
        res.send('PUT REQUEST MADE');

})

app.delete('/delete-data', function (req,res) {
        res.send('DELETE REQUEST MADE');

})

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
