module.exports = (app) =>{
    const hashtags = require('../controllers/hashtags.controller.js');

    //get all hashtags
    app.get('/', hashtags.findAll);

    //get on hashtag
    app.get('/:hashtag', hashtags.findOne);


}
