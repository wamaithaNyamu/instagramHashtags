module.exports = (app) =>{
    const hashtags = require('../controllers/hashtags.controller.js');

    //get all hashtags
    app.get('igbotwams.herokuapp.com/', hashtags.findAll);

    //get on hashtag
    app.get('igbotwams.herokuapp.com/:hashtag', hashtags.findOne);


}
