const mongoose = require('mongoose');
//SCHEMA
const pupSchema = new mongoose.Schema({
    hashtag: {
        type: String,
        unique : true,
       

    },
  
});

module.exports = mongoose.model('puppeteer', pupSchema);
