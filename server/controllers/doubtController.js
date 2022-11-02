const Doubt = require('../models/doubtModel.js');
const User = require('../models/userModel.js');
// const mongoose = require("mongoose");

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
        const doubt = await Doubt.findById(req.params.id).populate('answers').populate('author'); // populate is used to show author and answers on a doubt
        return res.render('show_doubt', { doubt, currentUser, answerCount });
    } catch(err) {
        console.log(err);
    }
}

const getUpdateDoubt = async (req, res) => {
    const currentUser = req.user;
    const id = req.params.id;
    try {
        const doubt = await Doubt.findById(id);
        console.log(doubt);
        return res.render('edit_doubt', { currentUser, doubt });
    } catch (err) {
        console.log(err);
    }
}

const updateDoubt = async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
        const updatedDoubt = await Doubt.findByIdAndUpdate(id, updatedData);
        return res.redirect(`/profile`);
    } catch (err) {
        console.log(err);
    }
}

const deleteDoubt = async (req, res) => {
    const id = req.params.id;
    
    try {
        const result = await Doubt.findByIdAndRemove(id);          // find the doubt by id and delete it from database
        return res.redirect(`/profile`);
    } catch (err) {
        console.log(err);
    }
}


module.exports = { createDoubt, getDoubt, getUpdateDoubt, updateDoubt, deleteDoubt };