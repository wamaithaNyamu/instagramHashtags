//THIS IS THE BACKEND
const puppeteer = require("puppeteer");
const select = require ('puppeteer-select');
const mongoose  = require('mongoose');

//express and body parser
let express = require('express');
let app = express();
let bodyParser = require("body-parser");

//requite the configuration variables from the .env file.
app.use(express.static(__dirname + "/public", {maxAge: 3456700000})); 
if (app.settings.env === 'development') process.env.NODE_ENV = 'development';
require("dotenv").config();
let LUMUSERNAME = process.env.LUMUSERNAME;
let LUMPASSWORD= process.env.LUMPASSWORD;

//--------------------------------------------------------------------------------
//get browser

//initiate browser, open new page and go to url then return page
async function getBrowser(){
    try{
        console.log("in get page");
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox',
                '--disable-setuid-sandbox',
                '--proxy-server=zproxy.lum-superproxy.io:22225'
            ]
        });
     
        return browser
    }catch (e) {
        console.log("this error is coming from the getBroswer func", e);
    }
}



//------------------------------------------------------------------------------
//go to instagram

async function goToInstagram(x){
try{
    const instagram = 'https://www.instagram.com/explore/tags/'+x;
    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.authenticate({
        username : LUMUSERNAME,
        password : LUMPASSWORD

    })
    
    //open explore tags
    await page.goto(instagram,{ timeout: 60000});
    console.log("searching the hashtag", x);

    //click search bar
    let searchBarSelector =   await select(page).getElement('.eyXLr');
    await searchBarSelector.click();

    //delay
    await sleep(10000);   

    //type hashtag
    await page.$eval('.XTCLo', el => el.value = '#'+x);


}catch (e){
        console.log("This error is coming from the gotToInstagram func", e);

}
}

//MONGOOSE
//----------------------------------------------------------------------------------------------
//SCHEMA
const hashtagSchema = new mongoose.Schema({
      hashtag: {
          type: String,

      },

      followers: {
        type:String,
      },

      relatedHashtags:{
          type: String,
      }
});

//mongoose model
const POST = mongoose.model('instagramhashtags', hashtagSchema, 'instagramhashtags');
let MONGOURI = process.env.MONGOURI;

//create  new hashtags in db
async function createPost(hashtag, followers,relatedHashtags){

    return new POST({
        hashtag,
        followers,
        relatedHashtags
    }).save();

}

//connect to mongo
async function connectMongo(){
    try{
    const connector = mongoose.connect(MONGOURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('connected to mongodb!');
    return connector;
}catch (e){
    console.log("This error is coming from the connrt mongo func", e);

}
}

//check if hashtag is in mongo
async function checkIfHashtagExists(hashtag){
    console.log('Checking if'+ hashtag +'is in db' );
    let result = POST.findOne({hashtag});

    if(result === true){
        console.log('hashtag in db');
    }else{
        console.log('we gon need puppeteer ');

    }
   


}

//mongo

async function mongoEverything(){
    try{
    await connectMongo();
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', function (req,res) {
        res.sendFile('index.html', {root : __dirname});
        });
     
    app.post('/', function(req, res){
        console.log(req.body.hashtag);
        checkIfHashtagExists(req.body.hashtag);
 
    });
}catch (e){
    console.log("This error is coming from the gotToInstagram func", e);

}
  

}
mongoEverything();
//----------------------------------------------------------------------------------------------
//sleep function
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }  


 
//----------------------------------------------------------------------------------------------
//main

//server
app.listen(3000, function () {
    console.log("Node server running");
});

