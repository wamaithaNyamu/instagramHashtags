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
          unique : true,
         

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
    mongoose.set('useCreateIndex', true)
    console.log('connected to mongodb!');
    return connector;
}catch (e){
    console.log("This error is coming from the connrt mongo func", e);

}
}

//check if hashtag is in mongo
async function checkIfHashtagExists(hashtag,res){
    console.log('Checking if'+ hashtag +'is in db' );
    // let result = await  POST.findOne({hashtag:hashtag});
    // console.log(result);
    POST.exists({hashtag: hashtag}, function(err, result){
        if(err){
            let b =res.send(err);
            console.log(result,'b');

        }else {
        
            let a = res.send(result)
            console.log(result,'a')
            if(result==true){
                console.log('true in the db')
            }else{
                console.log('false not in the db');
                storeToMongo(hashtag);
 
            }
           ;
        }
    })

   


}
//store to mongo if not in mongo
async function storeToMongo(hashtag){
    try{
        
    let b = await createPost(hashtag, 'dummy', 'dummy');
    console.log('stored cont',b);
    console.log("stored!");
    }catch (e){
        console.log("This error is coming from the storeToMongo func", e);

    }
}

async function mongoEverything(){
    try{
    await connectMongo();
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', function (req,res) {
        res.sendFile('index.html', {root : __dirname});
        });
     
    app.post('/', function(req, res){
        console.log(req.body.hashtag);
        console.log(req.body);
        checkIfHashtagExists(req.body.hashtag, res);
        //res.sendFile('index.html', {root : __dirname});

    });
}catch (e){
    console.log("This error is coming from the mongoEverything func", e);

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
app.listen(8000, function () {
    console.log("Node server running");
});

