const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        min : 3
    },
    description : {
        type : String,
        required : true,
        min : 3
    },
    body : {
        type : String,
        required : true,
        min : 3
    },
    taglist : {
        type : Array
    }
});

module.exports = mongoose.model('Article', ArticleSchema);