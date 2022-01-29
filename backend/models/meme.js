const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memeSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    userId: {
        type: String,
    }
},
{
    timestamps: true
})

const Memes = mongoose.model('meme',memeSchema);
module.exports =Memes;