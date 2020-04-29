const Hashtags = require('../models/pup.model.js');

// create new hashtag and save it - to be puppeteered
// exports.create = (req,res) => {
//     //validate request
//     if(!req.body.hashtag){
//         return res.status(400).send({
//             message: "submit something"
//         });
//     }

//         //new hashtag create
//     const hashtag = new Hashtags({
//         hashtag: req.body.hashtag,
        
//     });

//     //save hashtag in db
//     hashtag.save().then(data =>{
//         res.send(data);
//     }).catch(err =>{
//         res.status(500).send({
//             message: err.message || "Something went horribly wrong!"
//         });
//     });

// };


//retrieves everythingggg
// exports.findAll = (req,res) =>{
//     Hashtags.find().then(
//         allHashtags => {
//             res.render('index.ejs', {
//                 user: req.user,
//                 hashtagData : allHashtags
//             });
        
//     }).catch(err =>{
//         res.status(500).send({
//             message : err.message || "some error occured while retrieving hashtags"
//         });
//     });
// };

// retrieve one hashtag


// //update hashtag 
// exports.update = (req,res)=>{
// //validate request
//     if(!req.body.hashtag){
//         return res.status(400).send({
//             message: "The hashtag is empty "
//         });
//     }
//    //if hashtag in db update it
//    Hashtags.findByIdAndUpdate(req.params.hashtagId,{
//        hashtag : req.body.hashtag,
//        followers : req.body.followers,
//        relatedHashtags: req.body.relatedHashtags
//    },{new:true})
//    .then(hashtag => {
//        if(!hashtag){
//            return res.status(404).send({
//                message : "I knoweth not what thee searches"
//            });
//        }
//        res.send(hashtag);
//    }) .catch(err => {
//     if(err.kind === 'ObjectId') {
//         return res.status(404).send({
//             message: "Nothing  found with id " + req.params.hashtagId
//         });                
//     }
//     return res.status(500).send({
//         message: "Error updating note with id " + req.params.hashtagId
//     });
// });
// };


// exports.delete = (req, res) => {
//     Hashtags.findByIdAndRemove(req.params.hashtagId)
//     .then(hash => {
//         if(!hash) {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.hashtagId
//             });
//         }
//         res.send({message: "hash deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.hashtagId
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete note with id " + req.params.hashtagId
//         });
//     });
// };