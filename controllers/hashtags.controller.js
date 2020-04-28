const Hashtags = require('../models/hashtag.model.js');

//create new hashtag and save it - to be puppeteered
exports.create = (req,res) => {
    //validate request
    if(!req.body.followers){
        return res.status(400).send({
            message: "submit something"
        });
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


//retrieve on hashtag
exports.findOne = (req,res)=>{
    Hashtags.findOne({hashtag: req.params.hashtag}).
     
    then(
        oneHashtag => {
            if(!oneHashtag){
                return res.status(404).send({
                    message : "Apologies, we do'nt have this hashtag yet. Check in later. We are working on it ASAP!"
                })
            }
            // data = {
            //     hashtag : oneHashtag.hashtag,
            //     followers: oneHashtag.followers,  
            //    relatedHashtags:oneHashtag.relatedHashtags,
            // }
          //  res.send(oneHashtag);
            res.render('result.ejs', {
                  user: req.user,
                  data : oneHashtag
        
            });
            console.log("this is onehashtag", oneHashtag.hashtag);
        }
    ).catch(err=> {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message : "404 error"
            });
        }
        return res.status(500).send({
            message : "retrieval errors"
        })
    })
};


//update hashtag 
exports.update = (req,res)=>{
//validate request
    if(!req.body.hashtag){
        return res.status(400).send({
            message: "The hashtag is empty "
        });
    }
   //if hashtag in db update it
   Hashtags.findByIdAndUpdate(req.params.hashtagId,{
       hashtag : req.body.hashtag,
       followers : req.body.followers,
       relatedHashtags: req.body.relatedHashtags
   },{new:true})
   .then(hashtag => {
       if(!hashtag){
           return res.status(404).send({
               message : "I knoweth not what thee searches"
           });
       }
       res.send(hashtag);
   }) .catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Nothing  found with id " + req.params.hashtagId
        });                
    }
    return res.status(500).send({
        message: "Error updating note with id " + req.params.hashtagId
    });
});
};


exports.delete = (req, res) => {
    Hashtags.findByIdAndRemove(req.params.hashtagId)
    .then(hash => {
        if(!hash) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.hashtagId
            });
        }
        res.send({message: "hash deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.hashtagId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.hashtagId
        });
    });
};