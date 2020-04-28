//setting up the webserver
const express = require('express');
const bodyParser = require('body-parser');
// require('./routes/hashtags.routes.js')(app);
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


//create express app
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

//define route
app.get('/',(req,res) => {
    res.json({"message": 'heey'});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});