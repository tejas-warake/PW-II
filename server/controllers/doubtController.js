const Doubt = require('../models/doubtModel.js');
const mongoose = require("mongoose");

const createDoubt = (req, res) => {
    const doubt = new Doubt(req.body);
    
    doubt.save(() => {
        res.redirect('/');
    })
}

const getDoubt = async (req, res) => {
    try {
        const doubt = await Doubt.findById(req.params.id).populate('answers');
        return res.render('show_doubt', { doubt });
    } catch(err) {
        console.log(err);
    }
}


module.exports = { createDoubt, getDoubt };