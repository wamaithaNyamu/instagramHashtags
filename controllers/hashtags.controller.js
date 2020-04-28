const Hashtags = require('../models/hashtag.model.js');

//create new hashtag and save it - to be puppeteered
exports.create = (req,res) => {
    //validate request
    if(!req.body.hashtag){
        return res.status(400).send({
            message: "submit something"
        })
    }

        //new hashtag create
    const hashtag = new Hashtags({
        hashtag: req.body.hashtag,
        followers: req.body.followers,
        relatedHashtags: req.body.relatedHashtags
    });

    //save hashtag in db
    hashtag.save().then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "Something went horribly wrong!"
        });
    });

};


//retrieves everythingggg
exports.findAll = (req,res) =>{
    Hashtags.find().then(
        allHashtags => {
            res.send(allHashtags);
        
    }).catch(err =>{
        res.status(500).send({
            message : err.message || "some error occured while retrieving hashtags"
        });
    });
};


//retrieve on hashtag
exports.findOne = (req,res)=>{
    Hashtags.findById(req.params.hashtagId).then(
        oneHashtag => {
            if(!oneHashtag){
                return res.status(404).send({
                    message : "Apologies, we do'nt have this hashtag yet. Check in later. We are working on it ASAP!"
                })
            }
            res.send(oneHashtag);

        }
    ).catch(err=> {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                
            })
        }
    })
};

exports.update = (req,res)=>{

};
exports.delete = (req,res)=>{

};
