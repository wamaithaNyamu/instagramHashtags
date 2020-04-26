//THIS IS THE BACKEND
const puppeteer = require("puppeteer");
//requite the configuration variables from the .env file.
require("dotenv").config();

let LUMUSERNAME = process.env.LUMUSERNAME;
let LUMPASSWORD= process.env.LUMPASSWORD;

//show user results
//add button to queries they want to use
//copy all selected hashtags
//allow maximum of thirty hashtags
//launch puppeteer browser
//get all links on first url
//store in array
//only add # if not in array
//launch threads for the next gen
//repeat until we no longer have any more #
//add hashtags to db
//cron job to update hashtags daily
//serve clients from the db instead
//use ajax to serve results
//if hashtag not in db, launch puppeer and add to db then add to updating hashtags daily




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

    })   //await interceptRequests(page);
    await page.goto(instagram,{ timeout: 60000});
    console.log("searching the hashtag", x);
}catch (e){
    console.log("This error is coming from the gotToInstagram func", e);
}
}






module.exports = {
    goToInstagram
}