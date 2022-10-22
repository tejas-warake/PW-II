const Answer = require("../models/answerModel.js");
const Doubt = require("../models/doubtModel.js");
const mongoose = require("mongoose");


const addAnswer = async (req, res) => {
  const answer = new Answer(req.body);
  const id = mongoose.Types.ObjectId(req.params.id.trim());
  // console.log(answer);

  try {
    await answer.save();
    const doubt = await Doubt.findById(id);
    doubt.answers.unshift(answer);
    await doubt.save();
    return res.redirect('/');
  } catch (err) {
    console.log(err);
  }

}


module.exports = { addAnswer };