const Doubt = require('../models/doubtModel.js');
const mongoose = require("mongoose");

const createDoubt = (req, res) => {
    if (req.user) {
        const doubt = new Doubt(req.body);

        doubt.save(() => {
            res.redirect('/');
        })
    } else {
        res.redirect('/login');
    }
}

const getDoubt = async (req, res) => {
    const currentUser = req.user;

    try {
        const doubt = await Doubt.findById(req.params.id).populate('answers');
        return res.render('show_doubt', { doubt, currentUser });
    } catch(err) {
        console.log(err);
    }
}


module.exports = { createDoubt, getDoubt };