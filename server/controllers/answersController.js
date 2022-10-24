const Answer = require("../models/answerModel.js");
const Doubt = require("../models/doubtModel.js");
const User = require("../models/userModel.js");
const mongoose = require("mongoose");


const addAnswer = async (req, res) => {
    if (req.user) {                                             // check if user is authenticated or not
        const userId = req.user._id;
        const answer = new Answer(req.body);
        const id = mongoose.Types.ObjectId(req.params.id.trim());   // to remove extra space and converting string to ObjectID type.
        answer.author = userId;

        try {
            await answer.save();
            const doubt = await Doubt.findById(id);       // associating doubt with its answers
            doubt.answers.unshift(answer);
            await doubt.save();
            const user = await User.findById(userId);
            user.answers.unshift(answer);                 // associating user with his answer
            user.save();
            return res.redirect('/');
        } catch (err) {
            console.log(err);
        }
    } else {
        res.redirect('/login');
    }

}


module.exports = { addAnswer };