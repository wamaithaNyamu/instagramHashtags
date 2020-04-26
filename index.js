//THIS IS THE BACKEND
const puppeteer = require("puppeteer");
const select = require ('puppeteer-select');

//requite the configuration variables from the .env file.
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

    })   //await interceptRequests(page);
    await page.goto(instagram,{ timeout: 60000});
    console.log("searching the hashtag", x);
    return page;
}catch (e){
    console.log("This error is coming from the gotToInstagram func", e);
}
}

//sleep function
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }  

//get hashtags
async function getHashtags(page,x){
    try{
       
     //   click the search bar
     let searchBarSelector =   await select(page).getElement('.eyXLr');
     await searchBarSelector.click();
     //delay
     await sleep(10000);   
     //type hashtag
     await page.$eval('.XTCLo', el => el.value = '#'+x);
//     await driver.findElement(By.css(".XTCLo")).sendKeys("#shoes")

     //delay
     //extract first set of hashtags
     //send to mnongo
    }catch (e){
        console.log("Error coming from getHashtags",e);
    }
}

//main
async function main(x){
    let input = x;
    console.log("the input:", input);
    let page = await goToInstagram(input);
    await getHashtags(page,input);
}

module.exports = {
    main
}