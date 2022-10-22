const { Schema, model } = require('mongoose');

const doubtSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  category: { type: String, required: true },
}, { timestamps: true });


module.exports = model('Doubt', doubtSchema);