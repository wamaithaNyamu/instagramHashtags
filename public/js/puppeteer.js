const puppeteer = require("puppeteer");
const select = require ('puppeteer-select');
const Hashtags = require('../../models/pup.model');

require("dotenv").config();
let LUMUSERNAME = process.env.LUMUSERNAME;
let LUMPASSWORD= process.env.LUMPASSWORD;
let MONGOURI = process.env.MONGOURI;
//----------------------------------------------------------------------------
//sleep
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  } 
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
    //await page.$eval('.XTCLo', el => el.value = '#'+x);
    console.log("this is x before type", x);
    await page.type('.XTCLo', x);
    console.log("this is x after type", x);


}catch (e){
        console.log("This error is coming from the gotToInstagram func", e);

}
}

const mongoose = require('mongoose');

//----------------------------------------------------------------------------------------------
//creates a connection to Mongo db
async function connectMongo(){
 mongoose.connect(MONGOURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
   Hashtags.findOne().sort({$natural: -1}).limit(1).exec(function(err, res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res.hashtag);
            goToInstagram(res.hashtag)
        }
    });
}


connectMongo();