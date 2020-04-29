module.exports = (app) =>{
    const hashtags = require('../controllers/hashtags.controller.js');


    //new hashtag
    // app.post('/hashtags', hashtags.create);


    //get all hashtags
    app.get('/', hashtags.findAll);

    //get on hashtag
    app.get('/:hashtag', hashtags.findOne);

    // //update a hashtag
    // app.put('/hashtags/:hashtagId', hashtags.update);

    // //delete a hashtag
    // app.delete('/hashtags/:hashtagId', hashtags.delete);
    
}
