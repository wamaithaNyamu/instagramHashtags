const Hashtags = require('../models/hashtag.model.js');
const PUP = require('../models/pup.model.js');

//retrieves everythingggg
exports.findAll = (req,res) =>{
    Hashtags.find().then(
        allHashtags => {
            res.render('index.ejs', {
                user: req.user,
                hashtagData : allHashtags
            });
        
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "some error occured while retrieving hashtags"
        });
    });
};


// retrieve one hashtag
exports.findOne = (req,res)=>{
    let search = req.params.hashtag;
    Hashtags.findOne({hashtag: search}).
     
    then(
        oneHashtag => {
            if(!oneHashtag){
        PUP.findOne({hashtag: search}).then(
            pup =>{
                if(!pup){
                                        //new hashtag create
                    const hashtag = new PUP({
                        hashtag: req.params.hashtag,

                });

                //save hashtag in db
                hashtag.save();
                }else {
                    return
                }
            }
        )  
   
    res.render('noresult.ejs');

               
            }
          else{
            res.render('result.ejs', {
                user: req.user,
                data : oneHashtag
      
          });
          console.log("this is onehashtag", oneHashtag.hashtag);
          }
        
        }
    ).catch(err=> {
        if(err.kind === 'ObjectId'){
            res.render('404.ejs');

        }
        return res.status(500).send({
            message : "retrieval errors"
        })
    })
};
