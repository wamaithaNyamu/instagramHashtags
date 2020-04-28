module.exports = (app) =>{
    const hashtags = require('../controllers/hashtags.controller.js');


    //new hashtag
    app.post('/hashtags', hashtags.create);


    //get all hashtags
    app.get('/hashtags', hashtags.findAll);

    //get on hashtag
    app.get('/hashtags/:hashtag', hashtags.findOne);
    // app.get('/', function(req,res){
    //     res.render('index')
    // })
    //update a hashtag
    app.put('/hashtags/:hashtagId', hashtags.update);

    //delete a hashtag
    app.delete('/hashtags/:hashtagId', hashtags.delete);
    
}