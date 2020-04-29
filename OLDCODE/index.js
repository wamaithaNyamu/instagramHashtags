//THIS IS THE BACKEND

const mongoose  = require('mongoose');
 var path = require('path');
//express and body parser
let express = require('express');
let app = express();
let bodyParser = require("body-parser");
app.set('view engine', 'ejs')
// app.set('views', './views');

//requite the configuration variables from the .env file.

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
            if(result===true){

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
        POST.find({},function(err,data){
            res.render('index.ejs', {
                user: req.user,
                hashtagData : data
            });
        });
        //  res.render('index', {root : __dirname});
        });

        app.get('/search',  function(req,res){
            POST.find({hashtag:req.body.hashtag }, function(err,))
        })
     
    app.post('/', function(req, res){
        console.log('Post a hashtag: ' + JSON.stringify(req.body));
        // console.log(req.body);
        checkIfHashtagExists(req.body.hashtag, res);

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
app.listen(8080, function () {
    console.log("Node server running");
});

