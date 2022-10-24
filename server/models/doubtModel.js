const { Schema, model } = require('mongoose');
const Answer = require("./answerModel.js");

const doubtSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  category: { type: String, required: true },
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


module.exports = model('Doubt', doubtSchema);