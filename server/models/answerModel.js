const { Schema, model } = require('mongoose');

const answerSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


module.exports = model('Answer', answerSchema);