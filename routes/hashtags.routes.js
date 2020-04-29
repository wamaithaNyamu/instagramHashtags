module.exports = (app) =>{
    const hashtags = require('../controllers/hashtags.controller.js');

    //get all hashtags
    app.get('igbot.herokuapp.com/', hashtags.findAll);

    //get on hashtag
    app.get('igbot.herokuapp.com/:hashtag', hashtags.findOne);


}
