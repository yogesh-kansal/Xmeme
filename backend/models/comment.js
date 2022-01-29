const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    memeId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
},
{
    timestamps: true
})

const Comments = mongoose.model('comment',commentSchema);
module.exports =Comments;