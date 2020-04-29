const puppeteer = require("puppeteer");
const select = require ('puppeteer-select');
const Hashtags = require('../../models/pup.model');
const HashtagsUpdate = require('../../models/hashtag.model');

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

//on same page 
async function ajaxScrape(x){


}

//------------------------------------------------------------------------------
//go to instagram

async function goToInstagram(x){
try{
    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.authenticate({
        username : LUMUSERNAME,
        password : LUMPASSWORD

    })
    const instagram = 'https://www.instagram.com/explore/tags/'+x;
    //open explore tags
    await page.goto(instagram,{ timeout: 60000});
    console.log("searching the hashtag", x);
    await sleep(40000);   

    //click search bar
    let searchBarSelector =   await select(page).getElement('.eyXLr');
    await searchBarSelector.click();

    //delay
    await sleep(10000);   
     //type hashtag
    //await page.$eval('.XTCLo', el => el.value = '#'+x);
    console.log("this is x before type", x);
    await page.type('.XTCLo', "#"+x);
    console.log("this is x after type", x);
    //sleep
    await sleep(10000);
    //get everything in drop down
    const allUrls = await page.$$eval('.fuqBx > a', links => links.map(link => link.href));
    const relHash = [];
    for (let url of allUrls ){
        var parts =url.split('/');
        var lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash
        let hash = "#" + lastSegment + " ";
        console.log(hash);
        relHash.push(hash);

    }
    const stringAll = await relHash.join("");
    console.log("all of them get em", stringAll);

    let posts = await page.$eval('    #react-root > section > main > header > div.WSpok > div.f7QXd.SM9CE > div:nth-child(2) > span > span', e => e.innerText);
    console.log("this hashtag has posts = " , posts);
    const hashtag = await new HashtagsUpdate({
        hashtag: x,
        followers: posts,
        relatedHashtags: stringAll
    });

    //save hashtag in db
    hashtag.save();


    await sleep(20000)
    browser.close();

   
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

//    Hashtags.findOne().sort({$natural: -1}).limit(1).exec(function(err, res){
    Hashtags.find().then( results => {
        console.log("the results are this long", results.length);

   if(results.length===0){
       console.log("nothing in collection");
       process.kill();
   }else{
    for(let result of results){
        console.log("bleh" , result.hashtag);
         goToInstagram(result.hashtag);
    }

}
});
}


async function main(){
    await connectMongo();
    await sleep(36000);
     console.log("dropping collection now");
    await Hashtags.collection.drop();
    // kill everything as work is done!
    console.log(" kill everything as work is done!");
    await process.exit();

}

main();