module.exports = (app) =>{
    const hashtags = require('../controllers/hashtags.controller.js');


    //new hashtag
    app.post('/hashtags', hashtags.create);


    //get all hashtags
    app.get('/', hashtags.findAll);

    //get on hashtag
    app.get('/:hashtag', hashtags.findOne);
    // app.get('/hashtags', hashtags.search);

    //update a hashtag
    app.put('/hashtags/:hashtagId', hashtags.update);

    //delete a hashtag
    app.delete('/hashtags/:hashtagId', hashtags.delete);
    
}
// const express = require('express');
// const { hash } =require('../controllers/hashtags.controller.js');
// const API = '/hashtags'

// const router = express.Router();

// router.get(`${API}/search`, hash);

// module.exports = router;