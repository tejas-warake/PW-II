const Doubt = require('../models/doubtModel.js');
const User = require('../models/userModel.js');
const mongoose = require("mongoose");

const createDoubt = async (req, res) => {
    if (req.user) {
        const userId = req.user._id;
        const doubt = new Doubt(req.body);
        doubt.author = userId;

        doubt.save();
        const user = await User.findById(userId);
        user.doubts.unshift(doubt);
        user.save();
        return res.redirect(`/doubts/${doubt._id}`);
        
    } else {
        res.redirect('/login');
    }
}

const getDoubt = async (req, res) => {
    const currentUser = req.user;
    var answerCount = 0;
    try {
        const doubt = await Doubt.findById(req.params.id).populate('answers').populate('author');
        return res.render('show_doubt', { doubt, currentUser, answerCount });
    } catch(err) {
        console.log(err);
    }
}


module.exports = { createDoubt, getDoubt };