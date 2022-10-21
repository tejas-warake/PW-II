const Doubt = require('../models/doubtModel.js');
const mongoose = require("mongoose");

const createDoubt = (req, res) => {
    const doubt = new Doubt(req.body);
    
    doubt.save(() => {
        res.redirect('/');
    })
}


module.exports = { createDoubt };