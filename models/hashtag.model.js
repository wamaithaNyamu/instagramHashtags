const mongoose = require('mongoose');
//SCHEMA
const hashtagSchema = new mongoose.Schema({
    hashtag: {
        type: String,
        unique : true,
       

    },

    followers: {
      type:String,
    },

    relatedHashtags:{
        type: String,
    },
        timestamps:true
   
  
});

module.exports = mongoose.model('Hashtags', hashtagSchema);
